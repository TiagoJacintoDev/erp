resource "azurerm_static_web_app" "frontend_app" {
  name                = module.naming.static_web_app.name
  sku_size            = local.tier.free.name
  sku_tier            = local.tier.free.tier
  resource_group_name = azurerm_resource_group.rg.name
  location            = local.location.fallback
}

resource "github_actions_secret" "gh_actions_secret" {
  secret_name     = "AZURE_STATIC_WEB_APPS_API_TOKEN"
  repository      = "subscription-management-system"
  plaintext_value = azurerm_static_web_app.frontend_app.api_key
}
