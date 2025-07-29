type CircularProgressProps = {
    value: number;
    max: number;
    size?: number;
    className?: string;
};

export default function CircularProgress({
    value,
    max,
    size,
    className = ""
}: CircularProgressProps) {
    const getResponsizeSize = () => {
        if (size) return size;

        return 120;
    };

    const actualSize = getResponsizeSize();
    const progress = Math.min(Math.max(value / max, 0), 1);

    const strokeWidth = Math.max(actualSize * 0.125, 8);
    const radius = (actualSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - progress * circumference;
    const center = actualSize / 2;

    const fontSize = Math.max(actualSize * 0.13, 12);

    return (
        <div className={`inline-flex ${className}`}>
            <svg
                className={`
                    ${!size ? 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-30 lg:h-30' : ''}
                    transition-all duration-300 ease-in-out
                `}
                style={size ? { width: size, height: size } : {}}
                viewBox={`0 0 ${actualSize} ${actualSize}`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    stroke="#e5e7eb"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={center}
                    cy={center}
                    className="transition-all duration-300"
                />
                <circle
                    stroke="orange"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    r={radius}
                    cx={center}
                    cy={center}
                    transform={`rotate(-90 ${center} ${center})`}
                    className="transition-all duration-500 ease-out"
                    style={{
                        filter: 'drop-shadow(0 0 6px rgba(255, 165, 0, 0.3))'
                    }}
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize={16}
                    className={`
                        fill-orange-400 font-bold transition-all duration-300
                        ${!size ? 'text-xs sm:text-sm md:text-base lg:text-lg' : ''}
                        `}
                    style={size ? { fontSize: `${fontSize}px` } : {}}
                >
                    {Math.round(progress * 100)}%
                </text>
            </svg>
        </div>
    );
}