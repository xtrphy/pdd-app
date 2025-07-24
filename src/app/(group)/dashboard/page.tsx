'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/rtk/store';
import Table from '@/components/Table';
import ProgressCard from '@/components/ProgressCard';
import Chart from '@/components/Chart';

const DashboardPage = () => {
    const { full_name, attempts } = useSelector((state: RootState) => state.profile)

    return (
        <div className='flex flex-col items-start'>
            <h1 className='text-3xl font-semibold mb-7'>Добро пожаловать, {full_name}</h1>
            <ProgressCard />
            <div className='flex flex-col items-center mt-7 w-full'>
                <Table attempts={attempts} />
                <Chart attempts={attempts} />
            </div>
        </div>
    );
};

export default DashboardPage;