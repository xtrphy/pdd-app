'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/rtk/hooks';
import { updateProfile } from '@/utils/rtk/reducers/profileSlice';
import { supabase } from '@/utils/supabaseClient';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';

interface Question {
    id: string;
    text: string;
    image: string;
    correctOption: string;
    options: Option[];
}

export interface Option {
    id: string;
    text: string;
}

const ExamPage = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [current, setCurrent] = useState<number>(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [correctness, setCorrectness] = useState<Record<number, boolean>>({});
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [autoSubmitPending, setAutoSubmitPending] = useState<boolean>(false);
    const profile = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const fetchQuestions = async () => {
            const { data, error } = await supabase
                .from('attempts')
                .select('questions_order')
                .eq('profile_id', profile.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single<{
                    questions_order: Question[]
                }>();

            if (error || !data) {
                console.error(error);
                return;
            }

            setQuestions(data.questions_order);
            const emptyAnswers: Record<number, string> = {};
            data.questions_order.forEach((_, i) => {
                emptyAnswers[i] = '';
            });
            setAnswers(emptyAnswers);
        };

        fetchQuestions();
    }, [profile.id]);

    const handleSelect = (questionIndex: number, selectedOptionId: string) => {
        if (submitted) return;

        const question = questions[questionIndex];
        const isCorrect = question.correctOption === selectedOptionId;

        setAnswers(prev => ({ ...prev, [questionIndex]: selectedOptionId }));
        setCorrectness(prev => ({ ...prev, [questionIndex]: isCorrect }));

        if (current < questions.length - 1) {
            setCurrent(current + 1)
        } else {
            setAutoSubmitPending(true);
        }
    };

    const handleSubmit = useCallback(async () => {
        setSubmitted(true);

        const correctCount = questions.reduce((acc, q, i) => {
            const selected = answers[i];
            return q.correctOption === selected ? acc + 1 : acc;
        }, 0);

        const answersData = questions.map((q, i) => ({
            questionId: q.id,
            selected: answers[i] ?? null,
            correct: q.correctOption,
        }));

        const { data: attempt, error } = await supabase
            .from('attempts')
            .select('id')
            .eq('profile_id', profile.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error || !attempt) {
            console.error(error);
            return;
        }

        const { error: updateError } = await supabase
            .from('attempts')
            .update({
                correct_answers: correctCount,
                incorrect_answers: questions.length - correctCount,
                answers: answersData,
            })
            .eq('id', attempt.id);

        if (updateError) {
            console.error(updateError);
        }

        const { data: newAttempts, error: fetchError } = await supabase
            .from('attempts')
            .select('*')
            .eq('profile_id', profile.id)
            .order('created_at', { ascending: false });

        if (fetchError || !newAttempts) {
            console.error(fetchError);
            return;
        }

        dispatch(updateProfile({ attempts: newAttempts }))

        router.push('/dashboard');
    }, [answers, dispatch, profile.id, questions, router]);

    useEffect(() => {
        if (autoSubmitPending) {
            const allAnswered = Object.values(answers).filter(a => a !== '').length === questions.length;
            if (allAnswered) {
                handleSubmit();
                setAutoSubmitPending(false);
            }
        }
    }, [answers, autoSubmitPending, handleSubmit, questions.length]);

    const question = questions[current];
    const isVideo = (url: string) => url.endsWith('.mp4');

    if (!question) return <Spinner />

    return (
        <div className='flex flex-col px-4 sm:px-6 lg:px-10 py-6 gap-6'>
            <div className='flex flex-wrap gap-2 sm:gap-3 bg-[#f6f6f6] text-[#212529] p-3 rounded-2xl select-none'>
                {questions.map((question, index) => (
                    <div
                        key={question.id}
                        className={`
                            w-10 h-10 sm:w-11 sm:h-11 text-sm sm:text-base flex items-center justify-center rounded-md transition-colors duration-200
                            ${correctness[index] === true ? 'border-1 border-[#007b55] bg-[#b8e4cd] text-[#007b55]' : ''}
                            ${correctness[index] === false ? 'border-1 border-[#b71d18] bg-[#f8cec1] text-[#b71d18]' : ''}
                            ${current === index ? 'bg-[#f3a93d] text-white' : ''}
                            `}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>

            <div className='flex flex-col border-1 border-gray-200 shadow-md rounded-3xl p-5 sm:p-8 gap-5 bg-white'>
                <span className='text-[#a3a3a3] text-base sm:text-lg'>Вопрос {current + 1}</span>
                <span className='text-xl sm:text-2xl'>{question.text}</span>

                <div className='flex flex-col lg:flex-row gap-6'>
                    {question.image && (
                        isVideo(question.image) ? (
                            <video
                                controls
                                autoPlay
                                playsInline
                                className='w-full lg:w-[60%] max-h-[400px] rounded-lg'
                                src={question.image}
                            />
                        ) : (
                            <Image
                                src={question.image}
                                alt={question.text}
                                width={700}
                                height={400}
                                className='w-full lg:w-[60%] max-h-[400px] rounded-lg object-contain'
                            />
                        )
                    )}

                    <div className='flex flex-col gap-4 w-full lg:w-[40%]'>
                        {question.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSelect(current, option.id)}
                                className='group flex items-center text-left gap-4 p-4 sm:p-5 text-base sm:text-xl bg-[#f6f6f6] border-1 border-transparent hover:border-orange-400 rounded-lg cursor-pointer'
                            >
                                <span className='text-[#a3a3a3] text-lg group-hover:text-black'>
                                    {option.id}.
                                </span>
                                <span>{option.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className='self-end bg-white ml-auto mt-7 w-fit rounded-4xl px-8 py-4 text-base sm:text-lg border-1 border-[#f2a93f] text-[#f2a93f] cursor-pointer'
            >
                Завершить экзамен
            </button>
        </div>
    );
}

export default ExamPage;