"use client"

import { useState } from 'react';
import { z } from 'zod';
import { Button } from './ui/button';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = loginSchema.safeParse({ email, password });

        if (!result.success) {
            setError(result.error.errors.map(err => err.message).join(', '));
            return;
        }

        // Send data to the server for authentication
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            // Handle success
            setError(null);
            console.log('Login successful');
        } else {
            // Handle errors
            setError('Login failed');
        }
    };

    return (
        <div className='flex items-center justify-center'>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {error && <p>{error}</p>}
                <Button />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
