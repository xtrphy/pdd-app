'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/rtk/store';
import CircularProgress from '@/components/CircularProgress';
import Table from '@/components/Table';

const DashboardPage = () => {
    const profile = useSelector((state: RootState) => state.profile)

    return (
        <div className='flex flex-col items-start'>
            <h1 className='text-3xl font-semibold mb-7'>Добро пожаловать, {profile?.full_name}</h1>
            <div className='bg-white border-1 shadow-lg rounded-3xl flex gap-3 px-7 py-5'>
                <div className='flex flex-col justify-around'>
                    <span className='text-xl'>Пройдено вопросов</span>
                    <span className='text-2xl text-gray-400'>
                        <span className='text-4xl text-orange-400'>0 </span>
                        / 40
                    </span>
                </div>
                <CircularProgress value={0} max={40} />
            </div>
            <div className='mt-7 w-full'>
                <Table />
            </div>
        </div>
    );
};

export default DashboardPage;