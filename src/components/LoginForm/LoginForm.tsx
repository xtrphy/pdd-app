'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { DefaultInput } from '../DefaultInput/DefaultInput';

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
        <form
            onSubmit={handleLogin}
            className='bg-white flex flex-col lg:flex-row items-center justify-between p-6 w-full max-w-[1290px] min-h-[650px] mx-auto rounded-lg lg:gap-6 xl:min-w-[1200px]'
        >
            <div className='w-full lg:w-1/2 flex flex-col'>
                <div className='mb-7'>
                    <h2 className='text-3xl sm:text-4xl font-black mb-3'>Авторизация</h2>
                    <p className='text-[#676767] text-base'>Авторизуйтесь для входа в личный кабинет.</p>
                </div>
                <div className='space-y-5'>
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
                {error && <p className='text-red-500 mt-3'>{error}</p>}
                <div className='mt-6 flex flex-col sm:flex-row gap-4'>
                    <button
                        type='submit'
                        aria-label='Войти'
                        className='bg-[#f2a940] hover:bg-orange-400 transition-colors duration-200 cursor-pointer text-white text-lg py-3 px-7 rounded-4xl font-medium'
                    >
                        Войти
                    </button>
                    <Link
                        href='/register'
                        className='bg-[#f6f6f6] hover:bg-[#f2a940] hover:text-[#f6f6f6] transition-colors duration-200 cursor-pointer text-lg text-[#f2a940] py-3 px-7 rounded-4xl font-medium text-center'
                    >
                        Регистрация
                    </Link>
                </div>
            </div>
            <div className='w-full lg:w-1/2 mt-10 lg:mt-0 flex flex-col justify-center items-center gap-6 bg-[#f2a940] text-white text-2xl sm:text-3xl font-black p-6 rounded-lg lg:rounded-xl'>
                Добро пожаловать!
                <Image
                    src='/car.webp'
                    alt='Car'
                    width={500}
                    height={200}
                    className='object-contain'
                />
            </div>
        </form>
    );
};

export default LoginForm;