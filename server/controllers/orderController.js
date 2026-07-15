import Order from "../models/Order.js";
import sendOrderEmail from "../utils/sendOrderEmail.js";

export const createOrder = async (req, res) => {

    try {

        const {
            orderItems,
            shippingAddress,
            totalPrice,
            paymentMethod,
        } = req.body;

        if (!orderItems || orderItems.length === 0) {

            return res.status(400).json({
                message: "No Order Items"
            });

        }

        const order = await Order.create({

            user: req.user._id,

            orderItems,

            shippingAddress,

            totalPrice,

            paymentMethod,

        });

        // 👇 Product details load pannum
        await order.populate("orderItems.product");

        // 👇 Order confirmation mail anuppum
        await sendOrderEmail(

            req.user.email,

            req.user.name,

            order

        );

        res.status(201).json({

            message: "Order Placed Successfully",

            order,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

export const getOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

export const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.user._id,

        })

            .populate("orderItems.product")

            .sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};



export const getOrderById = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)

            .populate("orderItems.product")

            .populate("user", "name email");

        if (!order) {

            return res.status(404).json({

                message: "Order Not Found",

            });

        }

        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }


};

export const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                message: "Order Not Found",
            });

        }

        order.orderStatus = req.body.status;

        await order.save();

        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};