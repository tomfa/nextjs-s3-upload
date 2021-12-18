const config = {
  s3: {
    region: process.env.AWS_BUCKET_REGION as string,
    bucketName: process.env.S3_BUCKET_NAME as string,
    endpointUrl: `https://s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${process.env.S3_BUCKET_NAME}`,
  },
}

export default config;
