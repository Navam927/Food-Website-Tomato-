import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        process.loadEnvFile('./secret.env');
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
