import { transporter } from "./sendEmail.js";

const sendOrderEmail = async (userEmail, userName, order) => {

    try {

        const items = order.orderItems
            .map(
                (item) =>
                    `<li>${item.product.name} × ${item.quantity}</li>`
            )
            .join("");

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: userEmail,

            subject: "🎉 Your TurboToys Order is Confirmed",

            html: `

            <div style="font-family:Poppins,sans-serif;padding:20px">

                <h2 style="color:#0d6efd">

                    Thank You ${userName}!

                </h2>

                <p>

                    Your order has been placed successfully.

                </p>

                <hr>

                <p>

                    <strong>Order ID :</strong>

                    ${order._id}

                </p>

                <p>

                    <strong>Payment :</strong>

                    ${order.paymentMethod}

                </p>

                <p>

                    <strong>Status :</strong>

                    ${order.orderStatus}

                </p>

                <h3>Items</h3>

                <ul>

                    ${items}

                </ul>

                <h3>

                    Total :

                    ₹${order.totalPrice}

                </h3>

                <br>

                <p>

                    We will notify you once your order is shipped.

                </p>

                <br>

                <h4>

                    🚗 TurboToys Team

                </h4>

            </div>

            `,

        });

    } catch (error) {
        console.error("Order email error:", error);
    }

};

export default sendOrderEmail;