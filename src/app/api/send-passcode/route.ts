// pages/api/sendEmail.js
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, subject, message } = req.body;

        // Create transporter using your SMTP configuration (e.g., Gmail, Mailgun, etc.)
        const transporter = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "api",
                pass: "e460d3a78e023d9d7816314a967e4dba"
            }
        });

        try {
            // Send email
            await transporter.sendMail({
                from: process.env.EMAIL_USER, // Sender address
                to: "emenikenicholasatwork@gmail.com", // Recipient's email
                subject: "login passcode", // Subject of the email
                text: "message", // Plain text message
                html: `<p>Your passcode is ${123456}</p>`, // HTML message
            });

            res.status(200).json({ success: true, message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Failed to send email' });
        }
    } else {
        // Handle unsupported HTTP methods
        res.status(405).json({ message: 'Method not allowed' });
    }
}
