import express from 'express';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import logger from './logger.mjs';
import { setupUploadApi } from './apis_controllers/uploadApi.mjs';
import { setupArtInstituteApi } from './apis_controllers/artInstituteApi.mjs';
const __filename = import.meta.url;
export const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined', { stream: { write: (message) => logger.info(message) } }));

// APIs
setupUploadApi(app);
setupArtInstituteApi(app);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});
