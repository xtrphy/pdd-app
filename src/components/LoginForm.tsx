'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { DefaultInput } from './DefaultInput';

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
        <form onSubmit={handleLogin} className='bg-white flex items-center justify-between p-6 w-[1290px] h-[650px] rounded-lg'>
            <div className='w-[50%] flex flex-col'>
                <div className='mb-7'>
                    <h2 className='text-[40px] font-black mb-3'>Авторизация</h2>
                    <p className='text-[#676767]'>Авторизуйтесь для входа в личный кабинет.</p>
                </div>
                <div className='space-y-7 flex gap-7'>
                    <DefaultInput
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={setEmail}
                    />
                    <DefaultInput
                        type='password'
                        placeholder='Пароль'
                        value={password}
                        onChange={setPassword}
                    />
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                <div className='mt-5 flex gap-3'>
                    <button type='submit' className='bg-[#f2a940] hover:bg-orange-400 transition-colors duration-200 cursor-pointer text-white text-lg py-3 px-7 rounded-4xl font-medium'>
                        Войти
                    </button>
                    <Link href='/register' className='bg-[#f6f6f6] hover:bg-[#f2a940] hover:text-[#f6f6f6] transition-colors duration-200 cursor-pointer text-lg text-[#f2a940] py-3 px-7 rounded-4xl font-medium'>Регистрация</Link>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-10 bg-[#f2a940] text-white text-4xl font-black h-full rounded-xl'>
                Добро пожаловать!
                <Image
                    src='/car.webp'
                    alt='Car'
                    width={500}
                    height={200}
                />
            </div>
        </form>
    );
};

export default LoginForm;