"use client";
import { useState } from 'react';
import { z } from 'zod';
import { Button } from './ui/button';
import { FormSuccess } from './form-success';
import { FormError } from './form-error';
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
    email: z.string().email()
});

interface formProps {
    email: string;
}

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const form = useForm<formProps>({
        email: ''
    });

    const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
        // e.preventDefault();
        console.log(values);
        const result = loginSchema.safeParse({ email });
        if (result.error) {
            setError(true);
        }
        console.log(result);

        // }
        // try {
        //     const response = await fetch('/api/sendpasscode', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ email }),
        //     });

        //     if (response.ok) {
        //         setError('Passcode sent! Check your email');
        //     } else {
        //         setError('Failed to send passcode');
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };

    return (
        <div className='w-full flex justify-center'>
            <div className="bg-white rounded-lg mt-20 space-y-4 p-5 flex flex-col w-[500px] shadow-2xl">
                <div className='my-5'>
                    <p className="text-2xl font-bold">Chat Docs.</p>
                    <p className="text-2xl font-bold">Welcome, Back.</p>
                    <p>A code will be sent to this email.</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
                        <div className='space-y-4'>
                            <FormField control={form.control} name='email' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type='email' placeholder='johnmark@gamil.com' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        {error && <FormError message='Invalid Credentials!' />}
                        {success && <FormSuccess message='Email Sent!' />}
                        <Button type='submit' className='w-full'>
                            submit
                        </Button>
                    </form>
                </Form>
                <div className='flex items-center w-full gap-2'>
                    <Button
                        size='lg'
                        className="w-full"
                        variant="outline"
                        onClick={() => { }}
                    >
                        <FcGoogle className="h-5 w-5" />
                    </Button>
                    <Button
                        size='lg'
                        className='w-full'
                        variant="outline"
                        onClick={() => { }}
                    >
                        <FaGithub className="h-5 w-5" />
                    </Button>
                </div>
                {/* <form className='flex flex-col w-full' onSubmit={handleSubmit}>
                    <input
                        className='p-3 rounded-md outline-none bg-slate-500/10'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    {error && <p className='text-red-500'>{error}</p>}
                    <FormSuccess message='Email sent!' />
                    <FormError message='Invalid Credentials' />
                    <Button className='mt-10' type='submit' >Login</Button>
                </form> */}
            </div>
        </div>
    );
}
