# File uploading to AWS S3 buckets from a [Next.js](https://nextjs.org/) project.

This repo shows file upload, list, display and delete of private files in S3, from Next.js.  

_Demo: [https://nextjs-s3-upload.vercel.app](https://nextjs-s3-upload.vercel.app)_

## Setup

_You'll need an S3 bucket and AWS credentials to run the
app. See section at bottom if you haven't got this already_.

### Set up env
Copy .env.example files to .env.local
```
cp .env.example .env.local
```

Replace with your aws region, bucket name and keys
```
S3_BUCKET_REGION=eu-north-1
S3_BUCKET_NAME=my.bucket.name
SECRET_AWS_ACCESS_KEY_ID=AKIAMyAWSAccessId......
SECRET_AWS_SECRET_ACCESS_KEY=XMyAWSSecret.......
```

### Install and run

```bash
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Add S3 bucket and IAM user

You'll need an S3 bucket and AWS credentials to run the
app.

#### Manually

- Navigate to [AWS console](https://s3.console.aws.amazon.com/) and create a regular S3 bucket.
- Preferably, create a new IAM user and download its keys.

#### With terraform

Terraform files are added to the **infrastructure** folder. This will prompt for bucket name, and then create a bucket and an IAM user with necessary permissions.

```
# Install terraform
brew install hashicorp/tap/terraform

# Navigate to terraform files
cd infrastructure

# Download modules
terraform init

# Create stuff. Will prompt for info and confirmation
terraform apply
```
