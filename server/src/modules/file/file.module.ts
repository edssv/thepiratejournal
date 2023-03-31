import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { diskStorage } from 'multer';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
    imports: [
        MulterModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    fileFilter: (request, file, callback) => {
                        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                            return callback(
                                new HttpException(
                                    {
                                        status: HttpStatus.UNPROCESSABLE_ENTITY,
                                        errors: {
                                            file: `Неподдерживаемый тип файла`,
                                        },
                                    },
                                    HttpStatus.UNPROCESSABLE_ENTITY
                                ),
                                false
                            );
                        }

                        callback(null, true);
                    },
                    storage: diskStorage({
                        destination: configService.get('file.uploadFolder'),
                        filename: (request, file, callback) => {
                            callback(
                                null,
                                `${randomStringGenerator()}.${file.originalname.split('.').pop().toLowerCase()}`
                            );
                        },
                    }),
                    limits: {
                        fileSize: configService.get('file.maxFileSize'),
                    },
                };
            },
        }),
    ],
    controllers: [FileController],
    providers: [ConfigModule, ConfigService, FileService],
})
export class FileModule {}
