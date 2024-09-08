"use client";
import { useState } from 'react';
import { z } from 'zod';
import { Button } from './ui/button';
import { headers } from 'next/headers';
import { stringify } from 'querystring';

const loginSchema = z.object({
    email: z.string().email(),
});

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = loginSchema.safeParse({ email });
        if (!result.success) {
            setError(result.error.errors.map(err => err.message).join('') + ", please enter a valid email address");
            return;
        }
        try {
            setError('');
            const response = await fetch('/api/sendpasscode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setError('Passcode sent! Check your email');
            } else {
                setError('Failed to send passcode');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-full flex justify-center'>
            <div className="bg-white rounded-lg mt-20 p-5 flex flex-col w-[500px] shadow-2xl">
                <div className='my-5'>
                    <p className="text-2xl font-bold">Chat Docs.</p>
                    <p className="text-2xl font-bold">Welcome, Back.</p>
                    <p>A code will be sent to this email.</p>
                </div>
                <form className='flex flex-col w-full' onSubmit={handleSubmit}>
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
