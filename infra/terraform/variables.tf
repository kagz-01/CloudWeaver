variable "cluster_name" {
  description = "The name of the cluster to be provisioned"
  type        = string
}

variable "environment" {
  description = "Target environment (DEV, STAGING, PROD)"
  type        = string
}

variable "provider_type" {
  description = "Cloud provider type (AWS, GCP, AZURE)"
  type        = string
}

variable "region" {
  description = "Target cloud region"
  type        = string
  default     = "us-east-1"
}
