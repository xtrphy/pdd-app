type LinearProgressProps = {
    value: number;
    max: number;
    width?: number;
    height?: number;
};

export default function LinearProgress({ value, max, width = 574, height = 8 }: LinearProgressProps) {
    const progress = Math.min(value / max, 1);
    const barWidth = width;
    const barHeight = height;
    const filledWidth = progress * barWidth;

    return (
        <svg width={barWidth} height={barHeight}>
            <rect
                x="0"
                y="0"
                width={barWidth}
                height={barHeight}
                fill="#e5e7eb"
                rx={3}
            />
            <rect
                x="0"
                y="0"
                width={filledWidth}
                height={barHeight}
                fill="#026b9c"
                rx={3}
            />
            <text
                x={barWidth / 2}
                y={3}
                alignmentBaseline="middle"
                textAnchor="middle"
                fontSize="12"
                fill="white"
                fontWeight="bold"
            >
            </text>
        </svg>
    );
}
