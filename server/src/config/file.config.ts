import { registerAs } from '@nestjs/config';
import { FileConfig } from './config.type';

export default registerAs<FileConfig>('file', () => ({
  uploadFolder: process.env.UPLOAD_FOLDER,
  maxFileSize: +process.env.MAX_FILE_SIZE,
}));
