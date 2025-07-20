'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/rtk/store';

const DashboardPage = () => {
    const profile = useSelector((state: RootState) => state.profile)

    return (
        <h1 className='text-3xl font-semibold'>Добро пожаловать, {profile?.full_name}</h1>
    );
};

export default DashboardPage;