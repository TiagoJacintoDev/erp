variable "resource_suffix" {
  type    = string
  default = "subms"
}

variable "backend_image_name" {
  type    = string
  default = "sms-backend"
}

variable "github_token" {
  type      = string
  sensitive = true
}
