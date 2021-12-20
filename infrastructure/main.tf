provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "bucket" {
  bucket = var.file_bucket_name
  acl    = "private"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "GET", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}


resource "aws_iam_user" "bucket_user" {
  name = "${var.file_bucket_name}-user"
  tags = {}
}

resource "aws_iam_user_policy" "s3_user_policy" {
  name = "${var.file_bucket_name}-user-s3-upload"
  user = aws_iam_user.bucket_user.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect: "Allow",
        Action: "s3:*",
        Resource: [
          "arn:aws:s3:::${var.file_bucket_name}/*"
        ]
      },
      {
        "Action": "s3:ListBucket",
        "Effect": "Allow",
        "Resource": [
          "arn:aws:s3:::${var.file_bucket_name}"
        ]
      }
    ]
  })
}

resource "aws_iam_access_key" "bucket_user" {
  user = aws_iam_user.bucket_user.name
}
