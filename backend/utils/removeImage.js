import cloudinary from 'cloudinary';

export const removeImage = (publicId) => {
    cloudinary.uploader.destroy(publicId, (result , error) => {
        if (error) {
            console.log('Error removing image from Cloudinary:', error);
        } else {
            console.log('Image deleted successfully:', result);
        }
    });
};

