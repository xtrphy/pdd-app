type LinearProgressProps = {
    value: number;
    max: number;
};

export default function LinearProgress({ value, max }: LinearProgressProps) {
    const progress = Math.min(value / max, 1) * 100;

    return (
        <div className="w-full bg-gray-200 rounded-full overflow-hidden h-[8px]">
            <div
                className="bg-[#026b9c] h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
