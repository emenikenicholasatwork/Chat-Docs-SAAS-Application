"use client"

import { useState } from 'react';
import { z } from 'zod';
import { Button } from './ui/button';
import nodemailer from 'nodemailer'

const loginSchema = z.object({
    email: z.string().email(),
});

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // const result = loginSchema.safeParse({ email });

        // if (!result.success) {
        //     setError(result.error.errors.map(err => err.message).join(', '));
        //     return;
        // }

        const res = await fetch('/api/send-passcode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        console.log(res)
    };

    return (
        <div className='w-full flex mt-[30%] justify-center'>
            <div className="bg-white rounded-lg p-10 flex flex-col items-center justify-center shadow-2xl">
                <div className='my-5'>
                    <p className="text-2xl font-bold">Chat Doc</p>
                    <p>enter email to get authentication code</p>
                </div>
                <form className='flex flex-col w-96' onSubmit={handleSubmit}>
                    <input
                        className='p-3 rounded-md outline-none bg-slate-500/10'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    {error && <p className='text-red-500'>{error}</p>}
                    <Button className='mt-10' type='submit' >Login</Button>
                </form>
            </div>
        </div>
    );
}
