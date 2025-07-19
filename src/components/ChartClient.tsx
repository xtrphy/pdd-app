'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

type Props = {
    data: { name: string; correct: number; incorrect: number }[]
}

export default function ChartClient({ data }: Props) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="correct" stroke="#22c55e" />
                <Line type="monotone" dataKey="incorrect" stroke="#ef4444" />
            </LineChart>
        </ResponsiveContainer>
    )
}