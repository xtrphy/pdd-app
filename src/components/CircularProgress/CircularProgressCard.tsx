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
        <div className='bg-white border-1 shadow-lg rounded-3xl flex gap-6 px-7 py-6'>
            <div className='flex flex-col justify-around'>
                <span className='flex items-center gap-3 text-xl'>
                    Пройдено вопросов
                    <TooltipComponent text={'Количество правильно отвеченных вопросов'} />
                </span>
                <span className='text-2xl text-gray-400'>
                    <span className='text-4xl text-orange-400'>{correctAnswers.length} </span>
                    / 40
                </span>
            </div>
            <CircularProgress value={correctAnswers.length} max={40} />
        </div>
    );
};

export default ProgressCard;