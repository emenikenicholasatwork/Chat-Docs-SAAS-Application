import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer'


const generatePasscode = () => Math.floor(100000 + Math.random() * 900000).toString();

let passcodeStore: { [key: string]: { passcode: string, expiry: Date } } = {}

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }

        const passcode = generatePasscode()
        const expiry = new Date(Date.now() + 10 * 60 * 1000)
        passcodeStore[email] = { passcode, expiry }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_API
            }
        })

        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Your login code',
            text: `Your passcode is ${passcode}`
        }

        try {
            await transporter.sendMail(mailOptions)
            res.status(200).json({ message: 'Passcode sent' })
        } catch (error) {
            res.status(500).json({ message: 'Failed to send email' })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}