output "AWS_ACCESS_KEY_ID" {
  value = aws_iam_access_key.bucket_user.id
}
output "AWS_SECRET_ACCESS_KEY" {
  value = aws_iam_access_key.bucket_user.secret
}
output "AWS_BUCKET_REGION" {
  value = aws_s3_bucket.bucket.region
}
output "S3_BUCKET_NAME" {
  value = aws_s3_bucket.bucket.bucket
}

