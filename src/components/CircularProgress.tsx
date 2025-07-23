type CircularProgressProps = {
    value: number;
    max: number;
    size?: number;
};

export default function CircularProgress({ value, max, size = 120 }: CircularProgressProps) {
    const radius = 55;
    const stroke = 15;
    const normalizeRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizeRadius;
    const progress = value / max;
    const strokeDashoffset = circumference - progress * circumference;
    const center = size / 2;

    return (
        <svg height={size} width={size}>
            <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizeRadius}
                cx={center}
                cy={center}
            />
            <circle
                stroke="orange"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                r={normalizeRadius}
                cx={center}
                cy={center}
                transform={`rotate(-90 ${center} ${center})`}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize={16}
                className="fill-orange-400 text-lg font-black"
            >
                {Math.round(progress * 100)}%
            </text>
        </svg>
    );
}