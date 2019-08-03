import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const port = process.env.PORT || '8080';

export const jwtSecret = process.env.JWT_SECRET;

export const dbURL = process.env.DB_URL;