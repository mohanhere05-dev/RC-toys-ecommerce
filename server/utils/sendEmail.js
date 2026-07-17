import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
    const { data, error } = await resend.emails.send({
        from: "TurboToys <onboarding@resend.dev>",
        to: [to],
        subject,
        text,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export default sendEmail;