import { PutObjectCommand } from '@aws-sdk/client-s3'
import s3 from '../lib/s3Client.js'
import multiparty from 'multiparty'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false, // Important for file uploads
  },
}

const BUCKET_NAME = process.env.BUCKET_NAME
const DOCUMENTS_PUBLIC_URL = process.env.DOCUMENTS_PUBLIC_URL
const ARTIFACTS_PUBLIC_URL = process.env.ARTIFACTS_PUBLIC_URL

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const form = new multiparty.Form()

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err)
      return res.status(500).json({ error: 'File upload failed' })
    }

    try {
      const file = files.file?.[0]
      const fileBuffer = fs.readFileSync(file.path)
      const originalName = file.originalFilename

      if (!originalName.endsWith('.pdf') && !originalName.endsWith('.glb')) {
        return res.status(400).json({ error: 'Only .pdf and .glb files are allowed' })
      }

      let Key, ContentType, urlBase

      if (originalName.endsWith('.pdf')) {
        Key = `documents/${originalName}`
        ContentType = 'application/pdf'
        urlBase = DOCUMENTS_PUBLIC_URL
      }
      if (originalName.endsWith('.glb')) {
        Key = `artifacts/${originalName}`
        ContentType = 'model/gltf-binary'
        urlBase = ARTIFACTS_PUBLIC_URL
      }

      const putCommand = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key,
        Body: fileBuffer,
        ContentType,
        ContentDisposition: 'inline',
        ACL: 'public-read',
      })

      await s3.send(putCommand)

      return res.status(200).json({ url: `${urlBase}${originalName}` })
    } catch (error) {
      console.error('Upload error:', error)
      return res.status(500).json({ error: 'Upload failed' })
    }
  })
}
