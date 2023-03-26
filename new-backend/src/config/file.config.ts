import { registerAs } from '@nestjs/config';

export default registerAs('file', () => ({
    uploadFolder: process.env.UPLOAD_FOLDER,
    maxFileSize: +process.env.MAX_FILE_SIZE,
}));
