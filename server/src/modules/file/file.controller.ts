import { Controller, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    // @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.uploadFile(file);
    }
}
