import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    const { email } = await req.json();
    if (!email) {
        return new Response('Email is required', {
            status: 400
        });
    }
    const passcode = uuidv4().slice(0, 6);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CHATDOCS_EMAIL,
            pass: process.env.APP_PASSWORD
        },
    });
    try {
        const response = await transporter.sendMail({
            from: {
                name: "Chat Docs",
                address: "docschat1@gmail.com"
            },
            to: email,
            subject: "Your Authentication Passcode",
            text: `Your passcode is ${passcode}`,
            html: `<p>Your passcode is: <b>${passcode}</b></p>`,
            headers: {
                'X-Priority': '3',  // Set priority to normal
                'X-Mailer': 'Nodemailer'  // Identifies Nodemailer as the mail client
            }
        });
        console.log(response);
        return new Response('passcode send successfully.', {
            status: 200,
        });
    } catch (error) {
        return new Response(`Faild to send passcode: ${error}`, {
            status: 500
        });
    }
};