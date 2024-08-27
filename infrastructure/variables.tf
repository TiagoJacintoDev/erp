variable "resource_suffix" {
  type    = string
  default = "tjerp"
}

variable "backend_image_name" {
  type    = string
  default = "erp-backend"
}

variable "github_token" {
  type      = string
  sensitive = true
}
