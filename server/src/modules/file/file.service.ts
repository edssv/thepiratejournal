import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
    constructor(private readonly configService: ConfigService) {}

    uploadFile(file: Express.Multer.File) {
        if (!file) {
            throw new HttpException(
                {
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        file: 'Файл не выбран.',
                    },
                },
                HttpStatus.UNPROCESSABLE_ENTITY
            );
        }

        const directory = file.path;
        const url = `${this.configService.get('app.serverDomain')}/${this.configService.get('app.assetsPrefix')}/${
            file.filename
        }`;

        return {
            success: 1,
            file: {
                ref: directory,
                url: url,
            },
        };
    }
}
