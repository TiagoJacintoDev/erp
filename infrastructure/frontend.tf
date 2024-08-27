resource "azurerm_static_web_app" "vite_frontend_app" {
  name                = module.naming.static_web_app.name
  sku_size            = local.tier.free.name
  sku_tier            = local.tier.free.tier
  resource_group_name = azurerm_resource_group.rg.name
  location            = local.location.fallback

  app_settings = {
    "VITE_API_URL" = azurerm_container_app.backend.ingress[0].fqdn
  }
}

resource "github_actions_secret" "gh_actions_secret" {
  secret_name     = "AZURE_STATIC_WEB_APPS_API_TOKEN"
  repository      = "erp"
  plaintext_value = azurerm_static_web_app.vite_frontend_app.api_key
}
