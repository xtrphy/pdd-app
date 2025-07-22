'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/rtk/store';

const DashboardPage = () => {
    const profile = useSelector((state: RootState) => state.profile)

    return (
        <div className='flex h-full items-start'>
            <h1 className='text-3xl font-semibold'>Добро пожаловать, {profile?.full_name}</h1>
        </div>
    );
};

export default DashboardPage;