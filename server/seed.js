import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import products from "./data/products.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();

        await Product.insertMany(products);

        console.log("✅ Products Imported");

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

importData();