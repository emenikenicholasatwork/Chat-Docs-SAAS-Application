import { NextApiRequest, NextApiResponse } from "next";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

export const POST = async (req: any, res: NextApiResponse) => {
    const requestData = await req.json();
    const { email } = requestData;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    const passcode = uuidv4().slice(0, 6);

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        },
    } as SMTPTransport.Options);
    try {
        await transporter.sendMail({
            from: process.env.CHATDOCS_EMAIL,
            to: email,
            subject: "Your Authentication Passcode",
            text: `Your passcode is ${passcode}`,
            html: `<p>Your passcode is: <b>${passcode}</b></p>`
        });
        res.status(200).json({ success: true, message: 'Passcode sent Successfully.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to send Passcode' });
    }
};