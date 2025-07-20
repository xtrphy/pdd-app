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
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

const Modal = () => {
    const router = useRouter()

    const handleExit = async () => {
        await supabase.auth.signOut()
        router.push('/')
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className="flex items-center gap-5 w-full py-4 px-4 rounded-lg hover:bg-orange-100 hover:text-black/60 transition-colors duration-200 bg-transparent text-[#969696] cursor-pointer">
                <CircleX />
                Выйти
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Вы уверены что хотите выйти?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие не может быть отменено. Вам придется заново войти в ваш аккаунт или создать новый.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Отмена</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-orange-100 text-black hover:bg-orange-200 hover:text-black/60 transition-colors duration-200 cursor-pointer"
                        onClick={handleExit}
                    >Выйти</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Modal;