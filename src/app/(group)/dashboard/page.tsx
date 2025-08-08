'use client'

import React from 'react';
import { useAppSelector } from '@/utils/rtk/hooks';
import Table from '@/components/Table/Table';
import CircularProgressCard from '@/components/CircularProgress/CircularProgressCard';
import Chart from '@/components/Chart';

const DashboardPage = () => {
    const { full_name, attempts } = useAppSelector(state => state.profile)

    return (
        <div className='flex flex-col items-start'>
            <h1 className='text-xl lg:text-3xl font-semibold mb-7'>Добро пожаловать, <br /> {full_name}</h1>
            <CircularProgressCard />
            <div className='flex flex-col items-center mt-7 w-full'>
                <Table attempts={attempts} />
                <Chart attempts={attempts} />
            </div>
        </div>
    );
};

export default DashboardPage;