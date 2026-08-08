import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOrderEmail = async (userEmail, userName, order) => {
  try {
    const items = order.orderItems
      .map(
        (item) =>
          `<li>${item.product.name} × ${item.quantity}</li>`
      )
      .join("");

    // 1. Calculations for Subtotal, GST, and Grand Total
    const subtotal = order.totalPrice || 0;
    const gstRate = 0.18; // 18% GST
    const gstAmount = subtotal * gstRate;
    const grandTotal = subtotal + gstAmount;

    await resend.emails.send({
      from: "TurboToys <onboarding@resend.dev>",
      to: userEmail,
      subject: "🎉 Your TurboToys Order is Confirmed",
      html: `
      <div style="font-family:Poppins,sans-serif;padding:20px;color:#333">
        <h2 style="color:#0d6efd">
          Thank You ${userName}!
        </h2>

        <p>Your order has been placed successfully.</p>

        <hr style="border:none;border-top:1px solid #eee">

        <p><strong>Order ID :</strong> ${order._id}</p>
        <p><strong>Payment :</strong> ${order.paymentMethod}</p>
        <p><strong>Status :</strong> ${order.orderStatus}</p>

        <h3>Items</h3>
        <ul>
           ${items}
        </ul>

        <div style="margin-top: 15px; background: #f8f9fa; padding: 12px; border-radius: 6px;">
          <p style="margin: 4px 0;"><strong>Subtotal :</strong> ₹${subtotal.toFixed(2)}</p>
          <p style="margin: 4px 0;"><strong>GST (18%) :</strong> ₹${gstAmount.toFixed(2)}</p>
          <hr style="border:none;border-top:1px solid #ddd;margin: 8px 0;">
          <h3 style="margin: 4px 0; color: #0d6efd;">Total Amount : ₹${grandTotal.toFixed(2)}</h3>
        </div>

        <br>

        <p>We will notify you once your order is shipped.</p>

        <br>

        <h4>🚗 TurboToys Team</h4>
      </div>
      `,
    });

    console.log("✅ Order email sent");
  } catch (error) {
    console.error("❌ Order email error:", error);
  }
};

export default sendOrderEmail;