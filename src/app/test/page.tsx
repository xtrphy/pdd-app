'use client'

import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../store';
import {
    startTest,
    selectAnswer,
    nextQuestion,
    finishTest,
    resetTest,
} from '@/features/test/testSlice'
import { RootState } from '../store';

const TestContent = () => {
    const dispatch = useDispatch();
    const { currentIndex, answers, status } = useSelector(
        (state: RootState) => state.test
    )

    const handleStart = () => {
        dispatch(startTest())
    }

    const handleSelect = () => {
        dispatch(
            selectAnswer({
                questionId: '1',
                selectedOptionId: 'B',
            })
        )
    }

    const handleNext = () => {
        dispatch(nextQuestion())
    }

    const handleFinish = () => {
        dispatch(finishTest())
    }

    const handleReset = () => {
        dispatch(resetTest())
    }

    return (
        <div className='flex flex-col items-center justify-center gap-4 min-h-screen'>
            <h1 className='text-4xl font-bold'>Test Slice Debug</h1>

            <div className='space-y-2'>
                <button onClick={handleStart} className='px-4 py-2 bg-blue-500 text-white rounded'>
                    Start Test
                </button>
                <button onClick={handleSelect} className='px-4 py-2 bg-green-500 text-white rounded'>
                    Select Answer (1: B)
                </button>
                <button onClick={handleNext} className='px-4 py-2 bg-yellow-500 text-white rounded'>
                    Next Question
                </button>
                <button onClick={handleFinish} className='px-4 py-2 bg-purple-500 text-white rounded'>
                    Finish Test
                </button>
                <button onClick={handleReset} className='px-4 py-2 bg-red-500 text-white rounded'>
                    Reset Test
                </button>
            </div>

            <div className='text-left mt-6 bg-gray-100 p-4 rounded w-full max-w-md'>
                <p><strong>Current Index:</strong> {currentIndex}</p>
                <p><strong>Status:</strong> {status}</p>
                <p><strong>Answers:</strong></p>
                <pre className='bg-white p-2 rounded text-sm'>{JSON.stringify(answers, null, 2)}</pre>
            </div>
        </div>
    )
}

const TestPage = () => {
    return (
        <Provider store={store}>
            <TestContent />
        </Provider>
    );
};

export default TestPage;