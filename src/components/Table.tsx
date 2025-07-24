'use client';

import React, { useState } from 'react';
import { GraduationCap, ChevronLeft, ChevronRight, Dot } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/rtk/store';
import { formatDate } from '@/utils/formatDate';

// const examResults = [
//     { id: 1, type: 'Экзамен', date: '20.07.2025 11:05', passed: false, correct: 1, wrong: 39, total: 40 },
//     { id: 2, type: 'Экзамен', date: '19.07.2025 19:28', passed: false, correct: 5, wrong: 35, total: 40 },
//     { id: 3, type: 'Экзамен', date: '19.07.2025 18:40', passed: true, correct: 36, wrong: 4, total: 40 },
//     { id: 4, type: 'Экзамен', date: '18.07.2025 12:15', passed: true, correct: 38, wrong: 2, total: 40 },
//     { id: 5, type: 'Экзамен', date: '18.07.2025 10:00', passed: true, correct: 37, wrong: 3, total: 40 },
//     { id: 6, type: 'Экзамен', date: '17.07.2025 16:30', passed: false, correct: 30, wrong: 10, total: 40 },
//     { id: 7, type: 'Экзамен', date: '17.07.2025 15:00', passed: true, correct: 35, wrong: 5, total: 40 },
//     { id: 8, type: 'Экзамен', date: '17.07.2025 13:40', passed: true, correct: 40, wrong: 0, total: 40 },
//     { id: 9, type: 'Экзамен', date: '16.07.2025 19:20', passed: false, correct: 12, wrong: 28, total: 40 },
//     { id: 10, type: 'Экзамен', date: '16.07.2025 17:50', passed: false, correct: 20, wrong: 20, total: 40 },
//     { id: 11, type: 'Экзамен', date: '15.07.2025 14:15', passed: true, correct: 39, wrong: 1, total: 40 },
//     { id: 12, type: 'Экзамен', date: '15.07.2025 13:30', passed: false, correct: 28, wrong: 12, total: 40 },
//     { id: 13, type: 'Экзамен', date: '15.07.2025 10:45', passed: true, correct: 37, wrong: 3, total: 40 },
//     { id: 14, type: 'Экзамен', date: '14.07.2025 18:10', passed: false, correct: 7, wrong: 33, total: 40 },
//     { id: 15, type: 'Экзамен', date: '14.07.2025 15:55', passed: true, correct: 36, wrong: 4, total: 40 },
// ];

const PAGE_SIZE = 10;

const Table = () => {
    const { attempts } = useSelector((state: RootState) => state.profile)
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(attempts.length / PAGE_SIZE);
    const paginatedData = attempts.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <div className='border shadow-lg rounded-3xl mb-10'>
            <h3 className='text-2xl p-5 pb-6'>Результаты тестирования</h3>
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