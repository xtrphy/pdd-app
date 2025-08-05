import { Input } from "@/components/ui/input"

interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export function DefaultInput({ type, placeholder, value, onChange }: InputProps) {
    return <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        required
        className="bg-[#f6f6f6] h-14 placeholder:text-[14px] placeholder:text-[#5d5d5dccc] border-0 rounded-xl text-[15px]"
    />
}
