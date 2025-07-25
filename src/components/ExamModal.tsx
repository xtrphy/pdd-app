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

        const { data, error } = await supabase.from('attempts').insert({
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
            <AlertDialogTrigger className="bg-white border-1 shadow-lg hover:shadow-xl rounded-3xl gap-6 px-7 py-6 w-[630px] cursor-pointer mb-5">
                <LinearProgressCard />
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-3xl flex min-w-4xl min-h-3xl p-10 flex-col">
                <AlertDialogHeader className="flex flex-row justify-between items-center">
                    <AlertDialogTitle className="text-4xl w-fit">Условия экзамена</AlertDialogTitle>
                    <AlertDialogCancel className="hover:bg-transparent border-0 shadow-none [&_svg:not([class*='size-'])]:size-auto cursor-pointer text-gray-400">
                        <X size={28} />
                    </AlertDialogCancel>
                </AlertDialogHeader>

                <AlertDialogDescription className="text-gray-500 text-lg mb-2">
                    Перед началом убедитесь, что вы готовы пройти экзамен. Ознакомьтесь с правилами ниже.
                </AlertDialogDescription>

                <div>
                    <ul className="flex flex-col gap-2 text-xl p-5 list-disc">
                        <li>40 вопросов.</li>
                        <li>Проходной балл 35 и выше.</li>
                        <li>При достижении 6 неправильных ответов экзамен завершится автоматически.</li>
                        <li>Переход к следующему вопросу происходит автоматически.</li>
                    </ul>
                </div>
                <hr className="mb-5" />
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent hover:bg-gray-200 text-gray-500 hover:text-gray-500 text-xl transition-colors duration-200 cursor-pointer rounded-4xl px-12 py-7">Отмена</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-[#f2a940] text-white text-xl hover:bg-[#f6bf6f] transition-colors duration-200 cursor-pointer rounded-4xl px-12 py-7"
                        onClick={handleStartExam}
                    >
                        Начать экзамен
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ExamModal;