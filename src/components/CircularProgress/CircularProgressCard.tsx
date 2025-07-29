'use client'

import React from 'react';
import CircularProgress from './CircularProgress';
import { TooltipComponent } from '../Tooltip';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/rtk/store';
import { Answer } from '@/utils/rtk/reducers/profileSlice';

const ProgressCard = () => {
    const { attempts } = useSelector((state: RootState) => state.profile);

    const allRightAnswers = attempts.map(attempt => {
        return attempt.answers.filter(a => a.correct === a.selected);
    });

    const allFlattenRightAnswers = allRightAnswers.flat();
    const uniqueAnswersMap = new Map<number, Answer>();

    for (const answer of allFlattenRightAnswers) {
        if (!uniqueAnswersMap.has(answer.questionId)) {
            uniqueAnswersMap.set(answer.questionId, answer);
        }
    }

    const correctAnswers = Array.from(uniqueAnswersMap.values());

    return (
        <div className='bg-white border shadow-lg rounded-2xl sm:rounded-3xl flex items-center justify-between gap-4 sm:gap-6 p-4 sm:px-6 sm:py-5 lg:px-7 lg:py-6 w-full max-w-xs sm:max-w-md'>
            <div className='flex flex-col justify-center sm:justify-around min-w-0 gap-2 sm:gap-3'>
                <span className='flex items-start sm:items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg lg:text-xl leading-tight'>
                    <span className="flex-shrink-0">Пройдено вопросов</span>
                    <TooltipComponent text={'Количество правильно отвеченных вопросов'} />
                </span>

                <div className='text-base sm:text-lg lg:text-2xl text-gray-400 flex items-baseline gap-1'>
                    <span className='text-xl sm:text-2xl lg:text-4xl text-orange-400 font-bold tabular-nums'>
                        {correctAnswers.length}
                    </span>
                    <span className="text-gray-500">/</span>
                    <span className="tabular-nums">40</span>
                </div>
            </div>
            <CircularProgress
                value={correctAnswers.length}
                max={40}
                className="w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
            />
        </div>
    );
};

export default ProgressCard;