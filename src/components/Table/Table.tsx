'use client';

import React, { useState } from 'react';
import { GraduationCap, ChevronLeft, ChevronRight, Dot, Trophy, Calendar } from 'lucide-react';
import { formatDate } from '@/utils/formatDate/formatDate';
import { TooltipComponent } from '../Tooltip';
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
        <div className='w-full border shadow-lg rounded-2xl lg:rounded-3xl mb-6 lg:mb-10 overflow-hidden'>
            <div className='p-4 sm:p-5 pb-4 sm:pb-6 bg-white'>
                <h3 className='flex items-start sm:items-center gap-2 sm:gap-3 text-lg sm:text-xl lg:text-2xl font-semibold'>
                    <span>Результаты тестирования</span>
                    <div className="flex-shrink-0 mt-1 sm:mt-0">
                        <TooltipComponent text={'История тестов, которые вы прошли'} />
                    </div>
                </h3>
            </div>

            <div className='block lg:hidden'>
                {paginatedData.length === 0 ? (
                    <div className='text-center py-10 px-4 text-gray-500'>
                        <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-base">Пройдите первый тест,</p>
                        <p className="text-base">чтобы увидеть результаты</p>
                    </div>
                ) : (
                    <div className='space-y-3 p-4'>
                        {paginatedData.map((attempt) => {
                            const isPassed = attempt.correct_answers >= 35;
                            const { date, time } = formatDate(attempt.created_at);

                            return (
                                <div
                                    key={attempt.id}
                                    className='bg-gray-50 rounded-xl p-4 border'
                                >
                                    <div className='flex justify-between items-start mb-3'>
                                        <div className='flex items-center gap-2'>
                                            <GraduationCap
                                                className="w-5 h-5 text-orange-500 flex-shrink-0"
                                                strokeWidth={2.5}
                                            />
                                            <span className='font-medium text-sm sm:text-base'>
                                                {attempt.type}
                                            </span>
                                        </div>
                                        <span className={`
                                            px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold
                                            ${isPassed
                                                ? 'bg-[#00ab5533] text-[#00ab55]'
                                                : 'bg-[#FFE4DE] text-[#b71d18]'
                                            }
                                        `}>
                                            {isPassed ? 'Сдан' : 'Не сдан'}
                                        </span>
                                    </div>

                                    <div className='flex items-center gap-2 mb-3'>
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span className='text-sm text-gray-600'>
                                            {date} <span className='text-gray-400'>{time}</span>
                                        </span>
                                    </div>

                                    <div className='grid grid-cols-3 gap-2 text-xs sm:text-sm'>
                                        <div className='flex items-center gap-1'>
                                            <Dot className="w-4 h-4 text-[#00ab55]" strokeWidth={10} />
                                            <span>Верно: {attempt.correct_answers}</span>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <Dot className="w-4 h-4 text-[#f2a93f]" strokeWidth={10} />
                                            <span>Неверно: {attempt.incorrect_answers}</span>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <Dot className="w-4 h-4 text-[#dfdfdf]" strokeWidth={10} />
                                            <span>Всего: 40</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className='hidden lg:block overflow-x-auto'>
                <table className='min-w-full text-left'>
                    <thead className='bg-gray-100 font-medium text-gray-500'>
                        <tr>
                            <th className='p-5 text-sm lg:text-base'>Тип</th>
                            <th className='p-5 text-sm lg:text-base'>Дата</th>
                            <th className='p-5 text-sm lg:text-base'>Статус</th>
                            <th className='p-5 text-sm lg:text-base'>Результат</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={4} className='text-center py-10 text-gray-500'>
                                    <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                    <p className="text-xl">Пройдите первый тест, чтобы увидеть результаты</p>
                                </td>
                            </tr>
                        ) : paginatedData.map((attempt) => {
                            const isPassed = attempt.correct_answers >= 35;
                            const { date, time } = formatDate(attempt.created_at);

                            return (
                                <tr key={attempt.id} className='hover:bg-gray-50 transition-colors duration-150'>
                                    <td className='p-5'>
                                        <div className='flex items-center gap-3'>
                                            <GraduationCap
                                                className="w-5 h-5 text-orange-500 flex-shrink-0"
                                                strokeWidth={2.5}
                                            />
                                            <span className="text-sm lg:text-base">{attempt.type}</span>
                                        </div>
                                    </td>
                                    <td className='p-5'>
                                        <div className="text-sm lg:text-base">
                                            <span>{date}</span>
                                            <span className='text-gray-400 block sm:inline sm:ml-1'>
                                                {time}
                                            </span>
                                        </div>
                                    </td>
                                    <td className='p-5'>
                                        <span className={`
                                            px-3 py-2 rounded-lg text-sm font-bold inline-block
                                            ${isPassed
                                                ? 'bg-[#00ab5533] text-[#00ab55]'
                                                : 'bg-[#FFE4DE] text-[#b71d18]'
                                            }
                                        `}>
                                            {isPassed ? 'Сдан' : 'Не сдан'}
                                        </span>
                                    </td>
                                    <td className='p-5'>
                                        <div className='flex flex-col xl:flex-row xl:gap-6 gap-2 text-sm lg:text-base'>
                                            <div className='flex items-center gap-1'>
                                                <Dot className="w-4 h-4 text-[#00ab55]" strokeWidth={10} />
                                                <span>Верно: {attempt.correct_answers}</span>
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <Dot className="w-4 h-4 text-[#f2a93f]" strokeWidth={10} />
                                                <span>Неверно: {attempt.incorrect_answers}</span>
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <Dot className="w-4 h-4 text-[#dfdfdf]" strokeWidth={10} />
                                                <span>Всего: 40</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {attempts.length > 0 && (
                <>
                    <hr className='border-gray-200' />
                    <div className='flex flex-col sm:flex-row justify-between sm:justify-end items-center gap-3 py-4 px-4 sm:px-7 bg-gray-50'>
                        <div className="text-sm text-gray-600 sm:hidden">
                            Показано {paginatedData.length} из {attempts.length}
                        </div>

                        <div className='flex items-center gap-3'>
                            <button
                                className='p-2 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors duration-150 disabled:hover:bg-transparent'
                                onClick={() => setCurrentPage((p) => p - 1)}
                                disabled={currentPage === 1}
                                aria-label="Предыдущая страница"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <span className='py-2 px-4 bg-orange-400 rounded-lg text-white text-sm font-medium min-w-[3rem] text-center'>
                                {currentPage}
                            </span>

                            <button
                                className='p-2 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors duration-150 disabled:hover:bg-transparent'
                                onClick={() => setCurrentPage((p) => p + 1)}
                                disabled={currentPage === totalPages}
                                aria-label="Следующая страница"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            <span className='text-sm text-gray-600 hidden sm:inline ml-2'>
                                {paginatedData.length} / {attempts.length}
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Table;