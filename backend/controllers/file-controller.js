const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

class FileController {
    async uploadFile(req, res) {
        try {
            const { buffer, originalname } = req.file;

            const timestamp = Date.now();
            const ref = timestamp + '-' + originalname;
            const directory = path.join(`uploads/${ref}`);

            await sharp(buffer).resize(1600).jpeg({ quality: 70 }).toFile(directory);

            const link = `${process.env.API_URL}/${ref}`;

            res.json({
                success: 1,
                file: {
                    ref: directory,
                    url: link,
                },
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteFile(req, res) {
        const filePath = `${req.body.ref}`;
        fs.unlink(filePath, (err) => {
            if (err) {
                res.status(500).send({
                    message: 'Could not delete the file. ' + err,
                });
            }

            res.status(200).send({
                message: 'File is deleted.',
            });
        });
    }
}

module.exports = new FileController();
