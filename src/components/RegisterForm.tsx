'use client';

import React from 'react';
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

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
        <form onSubmit={handleRegister} className='flex flex-col gap-4 max-w-md'>
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
            <input
                type="text"
                placeholder='Имя'
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className='border p-2'
            />
            <input
                type="text"
                placeholder='Фамилия'
                value={surname}
                onChange={e => setSurname(e.target.value)}
                required
                className='border p-2'
            />
            <button type='submit' className='bg-blue-600 text-white p-2'>
                Зарегистрироваться
            </button>
            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>{success}</p>}
        </form>
    );
};

export default RegisterForm;