const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const User = require('../models/user-model');

const uploadFile = async (req, res) => {
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
};

const deleteFile = async (req, res) => {
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
};

const uploadAvatar = async (req, res) => {
    try {
        const { buffer, originalname } = req.file;
        const userId = req.currentUser._id;

        const timestamp = Date.now();
        const ref = timestamp + '-' + originalname;
        const directory = path.join(`uploads/${ref}`);

        await sharp(buffer).resize(1200).jpeg({ quality: 60 }).toFile(directory);

        const link = `${process.env.API_URL}/${ref}`;

        const user = await User.findOneAndUpdate({ _id: userId }, { avatar: link });

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
};

module.exports = { uploadFile, deleteFile, uploadAvatar };
