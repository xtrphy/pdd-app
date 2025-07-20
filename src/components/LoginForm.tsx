'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <form onSubmit={handleLogin} className='flex flex-col gap-4 max-w-md'>
            <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className='border p-2'
            />
            <input
                type="password"
                placeholder='Пароль'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className='border p-2'
            />
            <button type='submit' className='bg-green-600 text-white p-2'>
                Войти
            </button>
            {error && <p className='text-red-500'>{error}</p>}
        </form>
    );
};

export default LoginForm;