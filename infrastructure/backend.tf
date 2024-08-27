resource "azurerm_container_registry" "acr" {
  name                = module.naming.container_registry.name
  sku                 = "Basic"
  admin_enabled       = true
  resource_group_name = azurerm_resource_group.rg.name
  location            = local.location.main
}

locals {
  repository_url            = "https://github.com/TiagoJacintoDev/erp.git#main"
  latest_backend_image_name = "${var.backend_image_name}:latest"
}

resource "azurerm_container_registry_task" "import_backend_image_to_acr" {
  name                  = "import-backend-image-to-acr"
  container_registry_id = azurerm_container_registry.acr.id

  platform {
    os = "Linux"
  }

  docker_step {
    dockerfile_path      = "apps/backend/Dockerfile"
    context_path         = local.repository_url
    context_access_token = var.github_token
    image_names          = ["${var.backend_image_name}:{{.Run.ID}}", local.latest_backend_image_name]
  }

  source_trigger {
    name           = "github-trigger"
    events         = ["commit"]
    repository_url = local.repository_url
    source_type    = "Github"

    authentication {
      token      = var.github_token
      token_type = "PAT"
    }
  }
}

resource "azurerm_container_app_environment" "backend_app_environment" {
  name                = module.naming.container_app_environment.name
  resource_group_name = azurerm_resource_group.rg.name
  location            = local.location.fallback
}

resource "random_uuid" "acr_password_secret_name" {
  keepers = {
    acr_password = azurerm_container_registry.acr.admin_password
  }
}

resource "azurerm_container_registry_task_schedule_run_now" "build_backend_image" {
  container_registry_task_id = azurerm_container_registry_task.import_backend_image_to_acr.id
}

resource "azurerm_container_app" "backend" {
  name                         = module.naming.container_app.name
  resource_group_name          = azurerm_resource_group.rg.name
  container_app_environment_id = azurerm_container_app_environment.backend_app_environment.id
  revision_mode                = "Single"
  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = random_uuid.acr_password_secret_name.result
  }
  secret {
    name  = random_uuid.acr_password_secret_name.result
    value = azurerm_container_registry.acr.admin_password
  }
  template {
    container {
      name   = "erp-backend"
      image  = "${azurerm_container_registry.acr.login_server}/${local.latest_backend_image_name}"
      cpu    = local.resource_level.L1.cpu
      memory = local.resource_level.L1.memory
    }
  }

  ingress {
    external_enabled = true
    target_port      = 8080
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  depends_on = [azurerm_container_registry_task_schedule_run_now.build_backend_image]
}

resource "azapi_update_resource" "set_backend_app_cors" {
  type        = "Microsoft.App/containerApps@2024-03-01"
  resource_id = azurerm_container_app.backend.id
  body = jsonencode({
    properties = {
      configuration = {
        secrets = [{
          name : random_uuid.acr_password_secret_name.result
          value : azurerm_container_registry.acr.admin_password
        }]
        ingress = {
          corsPolicy = {
            allowedOrigins = ["*"]
            allowedMethods = ["*"]
            allowedHeaders = ["*"]
          }
        }
      }
    }
  })
}

resource "random_password" "pg_flex_server_password" {
  length  = 16
  special = true
}

resource "azurerm_postgresql_flexible_server" "pg_flex_server" {
  name                = "flex-${module.naming.postgresql_server.name}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = local.location.fallback
  zone                = "2"
  sku_name            = "B_Standard_B1ms"
  storage_mb          = 32768
  storage_tier        = "P4"
  version             = "16"

  public_network_access_enabled = true

  administrator_login    = "postgresql"
  administrator_password = random_password.pg_flex_server_password.result
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_all" {
  name             = "AllowAll"
  server_id        = azurerm_postgresql_flexible_server.pg_flex_server.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "255.255.255.255"
}

resource "azurerm_postgresql_flexible_server_configuration" "pg_flex_connection_throttling" {
  name      = "connection_throttle.enable"
  server_id = azurerm_postgresql_flexible_server.pg_flex_server.id
  value     = "on"
}

resource "azurerm_postgresql_flexible_server_configuration" "pg_flex_log_checkpoints" {
  name      = "log_checkpoints"
  server_id = azurerm_postgresql_flexible_server.pg_flex_server.id
  value     = "on"
}

resource "azurerm_postgresql_flexible_server_database" "pg_flex_db" {
  name      = "flex-${module.naming.postgresql_database.name}"
  server_id = azurerm_postgresql_flexible_server.pg_flex_server.id
}
