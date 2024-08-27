locals {
  role_assignments = {
    deployment_user_kv_admin = {
      role_definition_id_or_name = "Key Vault Administrator"
      principal_id               = data.azurerm_client_config.root.object_id
    }
    deployment_user_certificates = {
      role_definition_id_or_name = "Key Vault Certificates Officer"
      principal_id               = data.azurerm_client_config.root.object_id
    }
    deployment_user_secrets = {
      role_definition_id_or_name = "Key Vault Secrets Officer"
      principal_id               = data.azurerm_client_config.root.object_id
    }
  }

  secret_defaults = {
    content_type    = "text"
    expiration_date = timeadd(timestamp(), "8760h") # 1 year
    role_assignments = {
      deployment_user_kv_admin = {
        role_definition_id_or_name = "Key Vault Administrator"
        principal_id               = data.azurerm_client_config.root.object_id
      }
      deployment_user_secrets = {
        role_definition_id_or_name = "Key Vault Secrets Officer"
        principal_id               = data.azurerm_client_config.root.object_id
      }
    }
  }

  secrets = {
    database_host     = "database-host"
    database_username = "database-username"
    database_password = "database-password"
    database_name     = "database-name"
  }
}

# trunk-ignore(trivy/AVD-AZU-0013)
module "avm_res_keyvault_vault" {
  source              = "Azure/avm-res-keyvault-vault/azurerm"
  version             = "0.8.0"
  name                = module.naming.key_vault.name
  location            = local.location.main
  resource_group_name = azurerm_resource_group.rg.name
  tenant_id           = data.azurerm_client_config.root.tenant_id
  sku_name            = "standard"

  soft_delete_retention_days = 14
  purge_protection_enabled   = true

  role_assignments = local.role_assignments
  wait_for_rbac_before_secret_operations = {
    create = "60s"
  }

  secrets = {
    for secret_name, secret_key in local.secrets : secret_name => merge(
      local.secret_defaults,
      {
        name = secret_key
      }
    )
  }

  secrets_value = {
    database_host     = azurerm_postgresql_flexible_server.pg_flex_server.fqdn
    database_username = azurerm_postgresql_flexible_server.pg_flex_server.administrator_login
    database_password = azurerm_postgresql_flexible_server.pg_flex_server.administrator_password
    database_name     = azurerm_postgresql_flexible_server_database.pg_flex_db.name
  }

  public_network_access_enabled = true

  network_acls = {
    bypass         = "AzureServices"
    default_action = "Allow"
  }
}
