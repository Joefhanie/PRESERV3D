import { S3Client } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: 'auto',
  endpoint: 'https://4d7ff682acc1284a3ea9e111bdae405f.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
})

export default s3
