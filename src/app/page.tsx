import ChartClient from '@/components/ChartClient';
import React from 'react';

const data = [
    { name: "Пн", correct: 200, incorrect: 10 },
    { name: "Вт", correct: 180, incorrect: 12 },
]

const Home = () => {
    return (
        <ChartClient data={data} />
    );
};

export default Home;