import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendLoginEmail = async (user) => {
    try {
        await resend.emails.send({
            from: "TurboToys <onboarding@resend.dev>",
            to: user.email,
            subject: "🔐 Login Successful - TurboToys",

            html: `
      <div style="font-family:Arial;padding:20px">

      <h2>Hello ${user.name}, 👋</h2>

      <p>Your TurboToys account was successfully logged in.</p>

      <hr>

      <p><b>Time:</b> ${new Date().toLocaleString()}</p>

      <p>If this was you, no action is required.</p>

      <p>If you didn't login, please change your password immediately.</p>

      <br>

      <h3>🚗 TurboToys Team</h3>

      </div>
      `
        });

        console.log("✅ Login email sent");

    } catch (err) {
        console.error(err);
    }
};

export default sendLoginEmail;