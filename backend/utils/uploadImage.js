import cloudinary from 'cloudinary';
import { addFood } from '../controllers/foodController.js';
import streamifier from 'streamifier';
import mongoose from 'mongoose';

export const uploadImage = async(req, res) => {
    try {
        if(!req.file) {
            return res.status(404).json({
                message : "Please provide image file"
            })
        }

        const uploadResult = await new Promise( (resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream({
                folder : 'food-images'
            }, (error, result) => {
                if(error) {
                    return reject(error)
                }
                resolve(result);
            }   
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });

        req.body.url = uploadResult.secure_url;
        req.body.public_id = uploadResult.public_id;
        addFood(req, res);
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error.message);
        res.status(500).json({ message: "Failed to upload image" });
    }
}