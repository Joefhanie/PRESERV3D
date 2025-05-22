import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import s3 from '../lib/s3Client.js'

const BUCKET_NAME = process.env.BUCKET_NAME
const ARTIFACTS_PUBLIC_URL = process.env.DOCUMENTS_PUBLIC_URL

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: 'artifacts/',
    })

    const data = await s3.send(command)

    const urls = (data.Contents || [])
      .filter((obj) => obj.Key.endsWith('.glb'))
      .map((obj) => `${ARTIFACTS_PUBLIC_URL}${obj.Key.replace('artifacts/', '')}`)

    res.status(200).json(urls)
  } catch (error) {
    console.error('Error listing artifacts:', error)
    res.status(500).json({ error: 'Failed to list artifacts' })
  }
}
