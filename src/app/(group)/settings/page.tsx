'use client'

import { SettingsInput } from '@/components/SettingsInput/SettingsInput';
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
        <div className='flex flex-col gap-6 px-4 pb-6 sm:px-4 lg:px-8'>
            <h1 className='text-2xl sm:text-3xl font-semibold text-gray-800'>Настройки</h1>

            <form
                onSubmit={handleSubmit}
                className='flex flex-col items-center gap-6 bg-white p-6 sm:p-8 shadow-md rounded-2xl w-full'
            >
                <div className='flex flex-col lg:flex-row gap-6 w-full'>
                    <div className='flex flex-col gap-5 flex-1'>
                        <SettingsInput
                            label={"Email"}
                            htmlFor={"email"}
                            value={email}
                            onChange={setEmail}
                            disabled={true}
                        />
                        <AvatarInput setAvatarFile={setFile} />
                    </div>

                    <div className='flex-1'>
                        <SettingsInput
                            label={"ФИО"}
                            htmlFor={"text"}
                            value={fullName}
                            onChange={setFullName}
                        />
                    </div>
                </div>

                <hr className='border-gray-200' />

                <button
                    className='bg-orange-400 hover:bg-orange-300 text-white text-base sm:text-lg rounded-xl px-6 py-3 transition-colors duration-200 cursor-pointer'
                >
                    Сохранить изменения
                </button>

            </form>
        </div>
    );
};

export default SettingsPage;