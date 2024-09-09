"use client";
import { useRef, useState, useTransition } from 'react';
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
import { Loader2 } from 'lucide-react';
import { authenticate } from '@/lib/login';

const loginSchema = z.object({
    email: z.string().email("Invalid email address")
});

interface FormProps {
    email: string;
}

export default function AuthForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const [isWaitingCode, setIsWaitingCode] = useState<boolean>(false);
    const inputsRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (!/^\d$/.test(value)) {
            return;
        }
        if (value.length === 1 && index < inputsRefs.current.length - 1) {
            inputsRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
            inputsRefs.current[index - 1]?.focus();
        }
    };

    const form = useForm<FormProps>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: ''
        }
    });

    const handleSubmit = async (values: FormProps) => {
        setError(null);
        setSuccess(false);
        startTransition(async () => {
            try {
                const response = await authenticate(values);
                console.log(response);
            } catch (error: any) {
                setError(error.message);
            }
        });
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
                                    <FormLabel className='text-black'>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type='email' placeholder='johnmark@gmail.com'
                                            disabled={isWaitingCode || isPending} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )} />
                            <div className='w-full flex flex-col'>
                                <label htmlFor="">passcode</label>
                                <div className="flex space-x-2 w-full">
                                    {Array(6).fill(0).map((_, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength={1}
                                            ref={el => inputsRefs.current[index] = el}
                                            onChange={(e) => handleInputChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            className="border p-2 text-center w-full"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {error && <FormError message={error} />}
                        {success && <FormSuccess message='Email Sent!' />}
                        <Button type='submit' disabled={isPending} className='w-full'>
                            {isPending && <Loader2 className='animate-spin absolute ' />}
                            Submit
                        </Button>
                    </form>
                </Form>
                <div className='flex items-center w-full gap-2'>
                    <Button size='lg' className="w-full" variant="outline" onClick={() => { }}>
                        <FcGoogle className="h-5 w-5" />

                    </Button>
                    <Button size='lg' className='w-full' variant="outline" onClick={() => { }}>
                        <FaGithub className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
