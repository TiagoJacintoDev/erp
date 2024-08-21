locals {
  resource_level = {
    L1 = {
      cpu    = 0.25
      memory = "0.5Gi"
    }
    L2 = {
      cpu    = 0.5
      memory = "1Gi"
    }
    L3 = {
      cpu    = 0.75
      memory = "1.5Gi"
    }
    L4 = {
      cpu    = 1
      memory = "2Gi"
    }
  }

  tier = {
    free = {
      name = "Free"
      tier = "Free"
    }
  }

  location = {
    main     = "spaincentral"
    fallback = "westeurope"
  }
}
