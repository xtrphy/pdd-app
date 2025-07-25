'use client'

import ExamModal from '@/components/ExamModal';
import React from 'react';

const TestPage = () => {
    return (
        <div className='flex flex-col items-start justify-center'>
            <h1 className='text-3xl font-semibold mb-10'>Тестирование</h1>
            <ExamModal />
        </div>
    );
};

export default TestPage;