import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import sharp from 'sharp';
import logger from '../logger.mjs';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("__dirname - ", __dirname);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

export function setupUploadApi(app) {
    app.post('/upload', upload.single('image'), (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const imageBuffer = req.file.buffer;

            // Check file size 
            if (imageBuffer.length > 2 * 1024 * 1024) {
                return res.status(400).json({ error: 'File size exceeds 2 MB' });
            }

            const originalFilename = req.file.originalname;
            const filenameWithoutExtension = path.parse(originalFilename).name;
            const resizedFilename = `${filenameWithoutExtension}_100x100.png`;
            console.log("resizedFilename - ", resizedFilename)

            fs.writeFileSync(path.join(uploadsDir, originalFilename), imageBuffer);

            // Resize the image --
            sharp(imageBuffer)
                .resize(100, 100)
                .toBuffer()
                .then((data) => {
                    fs.writeFileSync(path.join(uploadsDir, resizedFilename), data);

                    logger.info('File uploaded successfully');

                    return res.json({
                        original_url: `https://localhost:${port}/uploads/${originalFilename}`,
                        resize_url: `https://localhost:${port}/uploads/${resizedFilename}`,
                    });
                })
                .catch((error) => {
                    console.error(error);
                    logger.error('An error occurred -', error);
                    return res.status(500).json({ error: 'Failed to resize the image' });
                });
        } catch (error) {
            logger.error('Error in /upload:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    });
}
