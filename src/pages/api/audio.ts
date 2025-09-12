import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import { formidable } from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import { clientPromise } from '@/lib/mongodb';

// Disable the default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Ensure the upload directory exists
const ensureUploadDirExists = async (dirPath: string) => {
  try {
    await fs.access(dirPath);
  } catch (_) {
    // If directory doesn't exist, create it
    await fs.mkdir(dirPath, { recursive: true });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'audio');
  await ensureUploadDirExists(UPLOAD_DIR);

  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db(); // Use your default database
    const audioCollection = db.collection('audioFiles');

    if (req.method === 'POST') {
      // --- HANDLE FILE UPLOAD ---
      const form = formidable({
        uploadDir: UPLOAD_DIR,
        keepExtensions: true,
        filename: (name, ext, part, form) => {
            // Sanitize filename and make it unique
            const originalName = name.replace(/[^a-zA-Z0-9.\-_]/g, '');
            return `${Date.now()}-${originalName}${ext}`;
        }
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form:', err);
          return res.status(500).json({ error: 'Error processing file upload.' });
        }

        // Assuming the file input name is 'audioFile'
        const file = files.audioFile?.[0];
        const language = fields.language?.[0] || 'en-us'; // Default language

        if (!file) {
          return res.status(400).json({ error: 'No file uploaded.' });
        }

        const audioUrl = `/uploads/audio/${file.newFilename}`;

        // Store file info in MongoDB
        const result = await audioCollection.insertOne({
          language: language,
          url: audioUrl,
          fileName: file.newFilename,
          originalName: file.originalFilename,
          createdAt: new Date(),
        });

        return res.status(201).json({
          message: 'File uploaded successfully',
          documentId: result.insertedId,
          url: audioUrl,
        });
      });

    } else if (req.method === 'GET') {
      // --- HANDLE FETCHING AUDIO URLS ---
      const { lang } = req.query;

      if (!lang || typeof lang !== 'string') {
        return res.status(400).json({ error: 'Language query parameter "lang" is required.' });
      }

      const audioFile = await audioCollection.findOne({ language: lang });

      if (audioFile) {
        return res.status(200).json({ url: audioFile.url });
      } else {
        return res.status(404).json({ message: 'No audio file found for the specified language.' });
      }
    } else {
      // Handle other methods
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
