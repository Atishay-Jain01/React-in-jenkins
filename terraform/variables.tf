variable "resource_group_name" {
  description = "The name of the Azure Resource Group where resources will be deployed"
  type        = string
  default     = "rg-azure-060425"
}

variable "location" {
  description = "The Azure region where resources will be created"
  type        = string
  default     = "Central US"
}

variable "app_service_plan_name" {
  description = "The name of the Azure App Service Plan"
  type        = string
  default     = "asp-react-060425"  
}

variable "app_service_name" {
  description = "The name of the Azure App Service"
  type        = string
  default     = "as-react-060425"   //  Global Unique name for Azure App Service
}