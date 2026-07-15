import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {

    try {

        const totalProducts = await Product.countDocuments();

        const totalOrders = await Order.countDocuments();

        const totalUsers = await User.countDocuments();

        const orders = await Order.find();

        const totalRevenue = orders.reduce(

            (sum, order) => sum + order.totalPrice,

            0

        );

        const recentOrders = await Order.find()
            .populate("user", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        const monthlyRevenue = [
            { month: "Jan", revenue: 12000 },
            { month: "Feb", revenue: 18000 },
            { month: "Mar", revenue: 22000 },
            { month: "Apr", revenue: 15000 },
            { month: "May", revenue: 28000 },
            { month: "Jun", revenue: totalRevenue },
        ];

        const orderStatus = [

            {
                name: "Pending",
                value: await Order.countDocuments({
                    orderStatus: "Pending",
                }),
            },

            {
                name: "Processing",
                value: await Order.countDocuments({
                    orderStatus: "Processing",
                }),
            },

            {
                name: "Shipped",
                value: await Order.countDocuments({
                    orderStatus: "Shipped",
                }),
            },

            {
                name: "Delivered",
                value: await Order.countDocuments({
                    orderStatus: "Delivered",
                }),
            },

            {
                name: "Cancelled",
                value: await Order.countDocuments({
                    orderStatus: "Cancelled",
                }),
            },

        ];

        const lowStockProducts = await Product.find({

            stock: { $lte: 5 }

        })
            .select("name stock image")
            .sort({ stock: 1 })
            .limit(5);

        const recentUsers = await User.find()
            .select("name email createdAt")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({

            totalProducts,

            totalOrders,

            totalUsers,

            totalRevenue,

            recentOrders,

            monthlyRevenue,

            orderStatus,

            lowStockProducts,

            recentUsers,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};