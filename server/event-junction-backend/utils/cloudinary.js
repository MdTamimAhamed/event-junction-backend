const cloudinary = require('cloudinary').v2;
const { resolve } = require('path');
const { Readable } = require('stream');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (file, unique_filename) => {
    try {
        if (!file) {
            return null;
        }
        return await new Promise((res, rej) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    public_id: unique_filename,
                    resource_type: 'auto',
                },
                (error, result) => {
                    if (error) {
                        return rej(error);
                    }
                    res(result);
                }
            );
            Readable.from(file).pipe(uploadStream);
        });
    } catch (error) {
        throw new Error(`Upload failed: ${error.message}`);
    }
};

module.exports = { cloudinaryUpload };
