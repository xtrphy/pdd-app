'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import '@/lib/chart';
import { Attempt } from '@/utils/rtk/reducers/profileSlice';
import { formatDate } from '@/utils/formatDate/formatDate';
import { TooltipComponent } from './Tooltip';
import { TooltipItem } from 'chart.js';

const Chart = ({ attempts }: { attempts: Attempt[] }) => {
    const attemptsWithFormattedDates = attempts.map(attempt => {
        const { date } = formatDate(attempt.created_at)
        return { ...attempt, created_at: date };
    });

    const dateMap: Record<string, { correct: number; incorrect: number }> = {};

    for (const attempt of attemptsWithFormattedDates) {
        const date = attempt.created_at;
        if (!dateMap[date]) {
            dateMap[date] = { correct: 0, incorrect: 0 };
        }
        dateMap[date].correct += attempt.correct_answers;
        dateMap[date].incorrect += attempt.incorrect_answers;
    }

    const labels = Object.keys(dateMap);
    const correctData = labels.map(date => dateMap[date].correct);
    const incorrectData = labels.map(date => dateMap[date].incorrect);

    const data = {
        labels,
        datasets: [
            {
                label: 'Правильные ответы',
                data: correctData,
                borderColor: '#2cac61',
                borderWidth: window.innerWidth < 768 ? 3 : 4,
                fill: true,
                backgroundColor: 'rgba(34, 197, 94, 0.05)',
                tension: 0.4,
                pointBorderColor: '#2cac61',
                pointBackgroundColor: '#fff',
                pointRadius: window.innerWidth < 768 ? 4 : 6,
                pointHoverRadius: window.innerWidth < 768 ? 6 : 7,
                pointHoverBorderWidth: window.innerWidth < 768 ? 3 : 5,
            },
            {
                label: 'Неправильные ответы',
                data: incorrectData,
                borderColor: '#f09d1b',
                borderWidth: window.innerWidth < 768 ? 3 : 4,
                tension: 0.4,
                pointBorderColor: '#f97316',
                pointBackgroundColor: '#fff',
                pointRadius: window.innerWidth < 768 ? 4 : 6,
                pointHoverRadius: window.innerWidth < 768 ? 6 : 7,
                pointHoverBorderWidth: window.innerWidth < 768 ? 3 : 5,
            },
        ],
    };

    const getResponsiveOptions = () => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;

        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top' as const,
                    align: isMobile ? 'center' as const : 'end' as const,
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: isMobile ? 12 : isTablet ? 16 : 22,
                        font: {
                            size: isMobile ? 12 : isTablet ? 14 : 18,
                        },
                        boxWidth: isMobile ? 8 : 12,
                        boxHeight: isMobile ? 8 : 12,
                    },
                },
                tooltip: {
                    backgroundColor: '#fff',
                    bodyColor: '#000',
                    titleColor: '#000',
                    cornerRadius: 8,
                    displayColors: false,
                    titleFont: {
                        size: 0,
                    },
                    bodyFont: {
                        size: isMobile ? 16 : isTablet ? 20 : 26,
                    },
                    callbacks: {
                        title: () => '',
                        label: (tooltipItem: TooltipItem<'line'>) => tooltipItem.formattedValue,
                    },
                    padding: isMobile ? 8 : 10,
                },
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: isMobile ? 10 : isTablet ? 12 : 14,
                        },
                        maxRotation: isMobile ? 45 : 0,
                        color: '#6b7280',
                    },
                    grid: {
                        display: !isMobile,
                        color: 'rgba(0, 0, 0, 0.1)',
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: isMobile ? 10 : 20,
                        font: {
                            size: isMobile ? 10 : isTablet ? 12 : 14,
                        },
                        color: '#6b7280',
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                    },
                },
            },
            elements: {
                line: {
                    borderWidth: isMobile ? 2 : 3,
                },
            },
        };
    };

    return (
        <div className='
            flex flex-col items-center 
            border shadow-lg 
            rounded-2xl lg:rounded-3xl 
            w-full 
            mb-6 lg:mb-10
            bg-white
        '>
            <div className='w-full px-4 sm:px-5 pt-4 sm:pt-5'>
                <h3 className='
                    flex items-start sm:items-center gap-2 sm:gap-3 
                    text-lg sm:text-xl lg:text-2xl font-semibold
                    mb-2 sm:mb-0
                '>
                    <span>Статистика за всё время</span>
                    <div className="flex-shrink-0 mt-1 sm:mt-0">
                        <TooltipComponent text={'Статистика правильных и неправильных ответов в тестах'} />
                    </div>
                </h3>
            </div>

            <div className='
                w-full 
                px-3 sm:px-4 lg:px-[7.5%] 
                pb-4 sm:pb-6
                mt-2 sm:mt-4
            '>
                {attempts.length === 0 ? (
                    <div className='
                        flex flex-col items-center justify-center
                        h-64 sm:h-80 lg:h-96
                        text-gray-500
                    '>
                        <div className='
                            w-16 h-16 sm:w-20 sm:h-20 
                            bg-gray-100 rounded-full 
                            flex items-center justify-center 
                            mb-4
                        '>
                            <svg
                                className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                        </div>
                        <p className="text-base sm:text-lg text-center">
                            Пройдите тесты, чтобы увидеть статистику
                        </p>
                    </div>
                ) : (
                    <div
                        className='
                            relative w-full
                            h-64 sm:h-80 md:h-96 lg:h-[400px]
                        '
                        style={{
                            minHeight: typeof window !== 'undefined' && window.innerWidth < 768 ? '250px' : '300px'
                        }}
                    >
                        <Line
                            data={data}
                            options={getResponsiveOptions()}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chart;