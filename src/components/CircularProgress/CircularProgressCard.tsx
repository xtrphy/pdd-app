import React from 'react';
import CircularProgress from './CircularProgress';
import { TooltipComponent } from '../Tooltip';

const ProgressCard = () => {
    return (
        <div className='bg-white border-1 shadow-lg rounded-3xl flex gap-6 px-7 py-6'>
            <div className='flex flex-col justify-around'>
                <span className='flex items-center gap-3 text-xl'>
                    Пройдено вопросов
                    <TooltipComponent text={'Количество правильно отвеченных вопросов'} />
                </span>
                <span className='text-2xl text-gray-400'>
                    <span className='text-4xl text-orange-400'>0 </span>
                    / 40
                </span>
            </div>
            <CircularProgress value={0} max={40} />
        </div>
    );
};

export default ProgressCard;