terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.115.0"
    }

    azapi = {
      source  = "Azure/azapi"
      version = "~> 1.14.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "~> 3.6.2"
    }
  }

  required_version = ">= 1.9.2"
}

provider "azurerm" {
  features {}
}
