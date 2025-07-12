import cloudinary from "cloudinary";

export const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    })
    const result = await cloudinary.v2.api.ping();
    // console.log(result);
    if (result.status == "ok") {
        console.log('cloudinary connected');
    } else {
        console.log('error connecting to cloudinary');
    }
}
