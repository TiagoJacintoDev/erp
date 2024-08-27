variable "resource_suffix" {
  type    = string
  default = "tj-erp"
}

variable "backend_image_name" {
  type    = string
  default = "erp-backend"
}

variable "github_token" {
  type      = string
  sensitive = true
}
