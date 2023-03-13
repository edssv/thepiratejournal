import { Request, Response } from 'express';
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

class AdminPanelFileController {
    uploadFile = async (req: Request, res: Response) => {
        try {
            const { buffer, originalname } = req.file;

            const timestamp = Date.now();
            const ref = timestamp + '-' + originalname;
            const directory = path.join(`media/${ref}`);

            await sharp(buffer).resize(1600).jpeg({ quality: 70 }).toFile(directory);

            const link = `${process.env.API_URL}/${ref}`;

            res.json({
                success: 1,
                file: {
                    ref: directory,
                    url: link,
                },
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    deleteFile = async (req: Request, res: Response) => {
        const filePath = `media\\${req.body.url.split('api/')[1]}`;
        fs.unlink(filePath, (err: any) => {
            if (err) {
                return res.status(500).send({
                    message: 'Could not delete the file. ' + err,
                });
            }

            res.status(200).send({
                message: 'File is deleted.',
            });
        });
    };
}

export default new AdminPanelFileController();
