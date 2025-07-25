import { Flag } from 'lucide-react';
import React from 'react';
import LinearProgress from './LinearProgress';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/rtk/store';

const LinearProgressCard = () => {
    const { attempts } = useSelector((state: RootState) => state.profile);
    const passedExams = attempts.filter(attempt => attempt.correct_answers >= 35);

    return (
        <div>
            <div className='flex flex-col justify-around gap-3'>
                <div className='bg-gray-200 rounded-lg p-3 w-[48px] h-[48px]'>
                    <Flag color="#026b9c" />
                </div>
                <span className='flex items-center gap-3 text-2xl font-black'>
                    Экзамен
                </span>
                <div className='flex justify-between'>
                    <span className='text-[#5e5e5e]'>Успешные попытки</span>
                    <span className='text-[#026b9c]'>{passedExams.length}/{attempts.length}</span>
                </div>
                <LinearProgress value={passedExams.length} max={attempts.length === 0 ? 1 : attempts.length} />
            </div>
        </div>
    );
};

export default LinearProgressCard;