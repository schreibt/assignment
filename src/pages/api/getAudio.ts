import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import { formidable } from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import clientPromise from '@/lib/mongodb'; 

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
    await fs.mkdir(dirPath, { recursive: true });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Good for local dev, but remember this path won't work on serverless deployments like Vercel
  const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'audio');
  await ensureUploadDirExists(UPLOAD_DIR);

  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db(process.env.MONGODB_DB); // Explicitly use the DB name from .env
    const audioCollection = db.collection('audio_files'); // Use a consistent collection name

    if (req.method === 'POST') {
      // --- HANDLE FILE UPLOAD ---
      const form = formidable({
        uploadDir: UPLOAD_DIR,
        keepExtensions: true,
        filename: (name, ext) => {
          const sanitizedName = name.replace(/[^a-zA-Z0-9.\-_]/g, '');
          return `${Date.now()}-${sanitizedName}${ext}`;
        }
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form:', err);
          return res.status(500).json({ error: 'Error processing file upload.' });
        }

        const file = files.audioFile?.[0];
        const language = fields.language?.[0] as string;

        if (!file || !language) {
          return res.status(400).json({ error: 'Missing file or language field.' });
        }

        const audioUrl = `/uploads/audio/${file.newFilename}`;

        const result = await audioCollection.insertOne({
          language: language.toUpperCase(), // Store language in a consistent case
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
      const { language } = req.query; // FIXED: Changed from 'lang' to 'language'

      console.log(`[API GET] Received request for language: ${language}`);

      if (!language || typeof language !== 'string') {
        return res.status(400).json({ error: 'Query parameter "language" is required.' });
      }

      // Find the document, making the search case-insensitive for robustness
      const audioFile = await audioCollection.findOne({ 
        language: { $regex: new RegExp(`^${language}$`, 'i') } 
      });


      if (audioFile) {
        console.log(`[API GET] Found audio file:`, audioFile);
        return res.status(200).json({ url: audioFile.url });
      } else {
        console.log(`[API GET] No audio file found for language: ${language}`);
        return res.status(404).json({ message: 'No audio file found for the specified language.' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
