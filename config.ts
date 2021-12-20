// All those env variables should be set

const config = {
  s3: {
    region: process.env.S3_BUCKET_REGION as string,
    bucketName: process.env.S3_BUCKET_NAME as string,
    endpointUrl: `https://s3.${process.env.S3_BUCKET_REGION}.amazonaws.com/${process.env.S3_BUCKET_NAME}`,
    credentials: {
      // Note: if you're on Vercel, you cannot add `AWS_ACCESS_KEY_ID`,
      // see https://vercel.com/docs/platform/limits#reserved-variables
      accessKeyId: process.env.SECRET_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.SECRET_AWS_SECRET_ACCESS_KEY as string,
    }
  },
}

export default config;
