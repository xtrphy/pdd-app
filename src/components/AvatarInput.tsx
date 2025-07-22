import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"

interface AvatarInputProps {
    setAvatarFile: (file: File | null) => void;
}

export function AvatarInput({ setAvatarFile }: AvatarInputProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setAvatarFile(file);
    };

    return (
        <div className="grid w-full items-center gap-3">
            <Label htmlFor="picture">Аватар</Label>
            <Input
                ref={fileInputRef}
                id="picture"
                type="file"
                className='bg-[#f6f6f6] h-14'
                onChange={handleFileChange}
            />
        </div>
    )
}
