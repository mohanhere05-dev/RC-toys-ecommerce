import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        console.error("❌ MongoDB Error Name:", error.name);
        console.error("❌ MongoDB Error Message:", error.message);
        process.exit(1);
    }
};

export default connectDB;