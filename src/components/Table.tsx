'use client';

import React, { useState } from 'react';
import { GraduationCap, ChevronLeft, ChevronRight, Dot } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import { TooltipComponent } from './Tooltip';
import { Attempt } from '@/utils/rtk/reducers/profileSlice';

const PAGE_SIZE = 10;

const Table = ({ attempts }: { attempts: Attempt[] }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(attempts.length / PAGE_SIZE);
    const paginatedData = attempts.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <div className='w-full border shadow-lg rounded-3xl mb-10'>
            <h3 className='flex items-center gap-3 text-2xl p-5 pb-6'>
                Результаты тестирования
                <TooltipComponent text={'История тестов, которые вы прошли'} />
            </h3>
            <table className='min-w-full text-left'>
                <thead className='bg-gray-100 font-medium text-gray-500'>
                    <tr>
                        <th className='p-5'>Тип</th>
                        <th className='p-5'>Дата</th>
                        <th className='p-5'>Статус</th>
                        <th className='p-5'>Результат</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length === 0 ? (
                        <tr>
                            <td colSpan={4} className='text-center py-10 text-gray-500 text-xl'>
                                Пройдите первый тест, чтобы увидеть результаты
                            </td>
                        </tr>
                    ) : paginatedData.map((attempt) => {
                        const isPassed = attempt.correct_answers >= 35 ? true : false
                        const { date, time } = formatDate(attempt.created_at);

                        return (
                            <tr key={attempt.id}>
                                <td className='flex items-center gap-3 py-6 px-5 mr-70'>
                                    <GraduationCap color='orange' strokeWidth={2.75} />{attempt.type}
                                </td>
                                <td className='p-5'>
                                    <span>{date}</span>
                                    <span className='text-gray-400'> {time}</span>
                                </td>
                                <td className='p-5'>
                                    <span className={`px-3 py-2 rounded-lg text-sm font-bold ${isPassed ? 'bg-[#00ab5533] text-[#00ab55]' : 'bg-[#FFE4DE] text-[#b71d18]'
                                        }`}>
                                        {isPassed ? 'Сдан' : 'Не сдан'}
                                    </span>
                                </td>
                                <td className='flex gap-7 p-5'>
                                    <span className='flex'>
                                        <Dot color='#00ab55' strokeWidth={10} />
                                        Верно: {attempt.correct_answers}
                                    </span>
                                    <span className='flex'>
                                        <Dot color='#f2a93f' strokeWidth={10} />
                                        Неверно: {attempt.incorrect_answers}
                                    </span>
                                    <span className='flex'>
                                        <Dot color='#dfdfdf' strokeWidth={10} />
                                        Всего: 40
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <hr className='mt-3' />
            <div className='flex justify-end items-center gap-3 py-5 px-7'>
                <button
                    className='px-3 py-1 rounded disabled:opacity-50 cursor-pointer hover:opacity-50 transition-opacity duration-150'
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft />
                </button>
                <span className='py-2 px-4 bg-orange-400 rounded-lg text-white'>{currentPage}</span>
                <button
                    className='px-3 py-1 rounded disabled:opacity-50 cursor-pointer hover:opacity-50 transition-opacity duration-150'
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight />
                </button>
                <span>{`${paginatedData.length} / ${attempts.length}`}</span>
            </div>
        </div>
    );
};

export default Table;