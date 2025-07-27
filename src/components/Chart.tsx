'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import '@/lib/chart';
import { Attempt } from '@/utils/rtk/reducers/profileSlice';
import { formatDate } from '@/utils/formatDate';
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
                borderWidth: 4,
                fill: true,
                backgroundColor: 'rgba(34, 197, 94, 0.05)',
                tension: 0.4,
                pointBorderColor: '#2cac61',
                pointBackgroundColor: '#fff',
                pointRadius: 6,
                pointHoverRadius: 7,
                pointHoverBorderWidth: 5,
            },
            {
                label: 'Неправильные ответы',
                data: incorrectData,
                borderColor: '#f09d1b',
                borderWidth: 4,
                tension: 0.4,
                pointBorderColor: '#f97316',
                pointBackgroundColor: '#fff',
                pointRadius: 6,
                pointHoverRadius: 7,
                pointHoverBorderWidth: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 22,
                    font: {
                        size: 18,
                    },
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
                    size: 26,
                },
                callbacks: {
                    title: () => '',
                    label: (tooltipItem: TooltipItem<'line'>) => tooltipItem.formattedValue,
                },
                padding: 10,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 20,
                },
            },
        },
    };


    return (
        <div className='flex flex-col items-center border shadow-lg rounded-3xl w-full'>
            <h3 className='flex items-center justify-start gap-3 w-full px-5 pt-5 text-2xl'>
                Статистика за всё время
                <TooltipComponent text={'Статистика правильных и неправильных ответов в тестах'} />
            </h3>
            <div className='w-[85%] pb-6'>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default Chart;