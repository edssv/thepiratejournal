const fs = require('fs');

class FileController {
    async uploadFile(req, res) {
        const getDestination = () => {
            if (req.files.cover) {
                return req.files.cover[0].destination;
            }
            if (req.files.avatar) {
                return req.files.avatar[0].destination;
            }
            if (req.files.image) {
                return req.files.image[0].destination;
            }
        };
        const getFilename = () => {
            if (req.files.cover) {
                return req.files.cover[0].filename;
            }
            if (req.files.avatar) {
                return req.files.avatar[0].filename;
            }
            if (req.files.image) {
                return req.files.image[0].filename;
            }
        };

        const getPath = () => {
            if (req.files.cover) {
                return req.files.cover[0].path;
            }
            if (req.files.avatar) {
                return req.files.avatar[0].path;
            }
            if (req.files.image) {
                return req.files.image[0].path;
            }
        };

        const fileDestination = getDestination();
        const filename = getFilename();
        const filePath = getPath();

        try {
            res.json({
                success: 1,
                file: {
                    filePath: `${filePath}`,
                    url: `${process.env.API_URL}/${fileDestination}/${filename}`,
                },
            });
        } catch (error) {
            return res.json(error);
        }
    }

    async deleteFile(req, res) {
        const directoryPath = process.cwd();
        const filePath = `${directoryPath}\\${req.body.filePath}`;
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
