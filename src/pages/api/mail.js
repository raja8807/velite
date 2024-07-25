import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to, subject, text, html } = req.body;

    // Create a transporter
    let transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SMTP_HOST,
      port: process.env.NEXT_PUBLIC_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER, // your email
        pass: process.env.NEXT_PUBLIC_SMTP_PASS, // your email password
      },
    });

    // Send mail with defined transport object
    try {
      let info = await transporter.sendMail({
        from: process.env.NEXT_PUBLIC_SENDER_MAIL_ID, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
      });

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
