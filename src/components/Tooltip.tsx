import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export function TooltipComponent({ text }: { text: string }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Info className="bg-gray-400 rounded-full text-white w-4.5 h-4.5" />
            </TooltipTrigger>
            <TooltipContent>
                <p className="text-[16px]">{text}</p>
            </TooltipContent>
        </Tooltip>
    )
}
