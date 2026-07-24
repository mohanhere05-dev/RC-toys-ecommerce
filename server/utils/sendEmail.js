import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
    try {
        const data = await resend.emails.send({
            from: "TurboToys <onboarding@resend.dev>",
            to,
            subject,
            text,
        });

        console.log("✅ Email Sent:", data);
        return data;
    } catch (error) {
        console.error("❌ Email Error:", error);
        throw new Error(error.message || "Failed to send email");
    }
};

import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


    export default sendEmail;