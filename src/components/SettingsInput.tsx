import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputProps {
    label: string;
    htmlFor: string;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function SettingsInput({ label, htmlFor, value, onChange, disabled }: InputProps) {
    return (
        <div className="grid w-full items-center gap-2">
            <Label htmlFor={htmlFor} className="text-[#5e5e5e]">{label}</Label>
            <Input type={htmlFor} id={label} value={value} onChange={e => onChange(e.target.value)} disabled={disabled} className='bg-[#f6f6f6] h-14 text-[16px]' />
        </div>
    )
}
