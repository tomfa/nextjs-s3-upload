variable "aws_region" {
  description = "e.g. eu-north-1, us-east-1"
  default = "eu-north-1"
}
variable "file_bucket_name" {
  description = "Name of S3 bucket for files, usually the same as the domain url. E.g. files.mywebsite.com"
}
