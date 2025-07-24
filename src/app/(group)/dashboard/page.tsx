'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/rtk/store';
import Table from '@/components/Table';
import ProgressCard from '@/components/ProgressCard';

const DashboardPage = () => {
    const profile = useSelector((state: RootState) => state.profile)

    return (
        <div className='flex flex-col items-start'>
            <h1 className='text-3xl font-semibold mb-7'>Добро пожаловать, {profile?.full_name}</h1>
            <ProgressCard />
            <div className='mt-7 w-full'>
                <Table />
            </div>
        </div>
    );
};

export default DashboardPage;