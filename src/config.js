import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

loadCorrectEnv();

dotenv.config();

export const port = process.env.PORT || '8080';

export const jwtSecret = process.env.JWT_SECRET;

export const dbURL = process.env.DB_URL;

function loadCorrectEnv() {
  const env = process.env.NODE_ENV;
  let envFileToUse = '.env.live';

  if (env == 'development')
    envFileToUse = '.env.local';

  const content = fs.readFileSync(path.resolve(__dirname, '../', envFileToUse), 'utf-8');
  fs.writeFileSync(path.resolve(__dirname, '../', '.env'), content);
}