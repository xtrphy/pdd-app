'use client';

import React from 'react';
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Link from 'next/link';
import { DefaultInput } from './DefaultInput';
import Image from 'next/image';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        const full_name = `${name} ${surname}`

        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        })

        if (signUpError) {
            setError(signUpError.message)
            setSuccess('')
            return
        }

        const user = data.user
        if (user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: user.id,
                    full_name,
                })

            if (profileError) {
                setError('Ошибка при создании профиля: ' + profileError.message)
                return
            }
        }

        setSuccess('Проверьте почту для подтверждения регистрации.')
        setError('')
    }

    return (
        <form onSubmit={handleRegister} className='bg-white flex items-center justify-between p-6 w-[1290px] h-[650px] rounded-lg'>
            <div className='w-[50%] flex flex-col gap-5'>
                <div className='mb-7'>
                    <h2 className='text-[40px] font-black mb-3'>Создание аккаунта</h2>
                    <hr />
                </div>
                <div className='grid grid-cols-2 grid-rows-2 gap-7'>
                    <DefaultInput
                        type='text'
                        placeholder='Имя'
                        value={name}
                        onChange={setName}
                    />
                    <DefaultInput
                        type='text'
                        placeholder='Фамилия'
                        value={surname}
                        onChange={setSurname}
                    />
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
                {success && <p className='text-green-500'>{success}</p>}
                <div className='mt-5 flex justify-end gap-3'>
                    <button type='submit' className='bg-[#f2a940] hover:bg-orange-400 transition-colors duration-200 cursor-pointer text-white text-lg py-3 px-7 rounded-4xl font-medium'>
                        Создать аккаунт
                    </button>
                </div>
                <hr />
                <div className='text-[#676767]'>Уже есть аккаунт? <Link href='/login' className='text-[#f2a940] hover:text-orange-400 transition-colors duration-200 ml-2'>Войти</Link></div>
            </div>
            <div className='flex flex-col justify-center items-center gap-10 bg-[#f2a940] text-white text-4xl font-black h-full rounded-xl'>
                Ещё чуть-чуть!
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

export default RegisterForm;