'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import LinearProgressCard from "./LinearProgress/LinearProgressCard";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/rtk/store";
import { questions } from '@/app/questions';
import { shuffleQuestions } from "@/utils/shuffleQuestions";

const shuffledQuestions = shuffleQuestions(questions);

const ExamModal = () => {
    const router = useRouter()
    const profile = useSelector((state: RootState) => state.profile);

    const handleStartExam = async () => {
        if (!profile) return;

        await supabase.from('attempts').insert({
            profile_id: profile.id,
            correct_answers: 0,
            incorrect_answers: 40,
            answers: [],
            questions_order: shuffledQuestions
        });

        const { data: latestAttempt, error: fetchError } = await supabase
            .from('attempts')
            .select('id')
            .eq('profile_id', profile.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (fetchError || !latestAttempt) {
            console.error(fetchError);
            return;
        }

        router.push(`/tests/exam/${latestAttempt.id}`);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-white border-1 shadow-md hover:shadow-xl rounded-3xl gap-6 px-5 py-6 w-full max-w-xl cursor-pointer">
                <LinearProgressCard />
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl w-full max-w-3xl p-6 sm:p-10 flex flex-col">
                <AlertDialogHeader className="flex flex-row justify-between items-start mb-4">
                    <AlertDialogTitle className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Условия экзамена
                    </AlertDialogTitle>
                    <AlertDialogCancel className="hover:bg-transparent border-0 shadow-none cursor-pointer text-gray-400 p-1">
                        <X />
                    </AlertDialogCancel>
                </AlertDialogHeader>

                <AlertDialogDescription className="text-gray-600 text-base sm:text-lg mb-6">
                    Перед началом убедитесь, что вы готовы пройти экзамен. Ознакомьтесь с правилами ниже.
                </AlertDialogDescription>

                <ul className="list-disc text-base sm:text-lg text-gray-700 px-5 space-y-2 mb-6">
                    <li>40 вопросов.</li>
                    <li>Проходной балл 35 и выше.</li>
                    <li>При достижении 6 неправильных ответов экзамен завершится автоматически.</li>
                    <li>Переход к следующему вопросу происходит автоматически.</li>
                </ul>

                <AlertDialogFooter className="flex flex-col items-center sm:flex-row gap-3 sm:gap-5 mt-auto">
                    <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-base rounded-full p-6 transition cursor-pointer">
                        Отмена
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleStartExam}
                        className="bg-[#f2a940] hover:bg-[#f6bf6f] text-white text-base font-medium rounded-full px-6 py-6 transition cursor-pointer"
                    >
                        Начать экзамен
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ExamModal;