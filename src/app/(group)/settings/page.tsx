'use client'

import { SettingsInput } from '@/components/SettingsInput';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/utils/rtk/store';
import { AvatarInput } from '@/components/AvatarInput';
import { updateProfile } from '@/utils/rtk/reducers/profileSlice';
import { supabase } from '@/utils/supabaseClient';
import { uploadToCloudinary } from '@/utils/cloudinary';

const SettingsPage = () => {
    const profile = useSelector((state: RootState) => state.profile)
    const dispatch = useDispatch()

    const [fullName, setFullName] = useState(profile.full_name)
    const [email, setEmail] = useState(profile.email)
    const [file, setFile] = useState<File | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        let avatarUrl = profile.avatar_url

        if (file) {
            const uploadRes = await uploadToCloudinary(file)
            avatarUrl = uploadRes.secure_url
        }

        if (!file) {
            avatarUrl = null
        }

        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: fullName,
                avatar_url: avatarUrl,
            })
            .eq('id', profile.id)

        if (!error) {
            dispatch(updateProfile({ full_name: fullName, email, avatar_url: avatarUrl }))
        }
    }

    return (
        <div className='flex flex-col gap-3 justify-start'>
            <h1 className='text-3xl font-semibold'>Настройки</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-6 shadow-lg rounded-lg'>
                <div className='flex items-start gap-5'>
                    <div className='flex flex-col gap-5 max-w-[50%] min-w-[50%]'>
                        <SettingsInput label={"Email"} htmlFor={"email"} value={email} onChange={setEmail} disabled={true} />
                        <AvatarInput setAvatarFile={setFile} />
                    </div>
                    <SettingsInput label={"ФИО"} htmlFor={"text"} value={fullName} onChange={setFullName} />
                </div>
                <hr />
                <button className='ml-[80%] w-[20%] bg-orange-400 hover:bg-orange-300 text-white text-lg rounded-4xl py-4 cursor-pointer transition-colors duration-200'>Сохранить изменения</button>
            </form>
        </div>
    );
};

export default SettingsPage;