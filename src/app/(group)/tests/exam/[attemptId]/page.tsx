'use client'

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/rtk/store';
import { supabase } from '@/utils/supabaseClient';

interface Question {
    id: string;
    text: string;
    correctOption: string;
    options: string[];
}

const optionIndexToLetter = ['A', 'B', 'C', 'D', 'E'];

const ExamPage = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const profile = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        const fetchQuestions = async () => {
            const { data, error } = await supabase
                .from('attempts')
                .select('questions_order')
                .eq('profile_id', profile.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (error || !data) {
                console.error(error);
                return;
            }

            setQuestions(data.questions_order);
            setAnswers(new Array(data.questions_order.length).fill(undefined));
        };

        fetchQuestions();
    }, [profile.id]);

    const handleSelect = (optionIndex: number) => {
        if (submitted) return;

        setAnswers((prev) => {
            const updated = [...prev];
            updated[current] = optionIndex;
            return updated;
        });
    };

    const nextQuestion = () => {
        if (current < questions.length - 1) setCurrent(current + 1);
    };

    const handleSubmit = async () => {
        setSubmitted(true);

        const correctCount = questions.reduce((acc, q, i) => {
            const selectedLetter = optionIndexToLetter[answers[i]];
            return q.correctOption === selectedLetter ? acc + 1 : acc;
        }, 0);

        const answersData = questions.map((q, i) => {
            const selectedIdx = answers[i];
            return {
                questionId: q.id,
                selected: optionIndexToLetter[selectedIdx],
                correct: q.correctOption,
            };
        });

        await supabase
            .from('attempts')
            .update({
                correct_answers: correctCount,
                incorrect_answers: questions.length - correctCount,
                answers: answersData,
            })
            .eq('profile_id', profile.id)
            .order('created_at', { ascending: false })
            .limit(1);
    };

    const question = questions[current];

    if (!question) return <div>Загрузка...</div>

    return (
        <div>
            {question.text}
        </div>
    );
}

export default ExamPage;