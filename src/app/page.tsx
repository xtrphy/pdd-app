import React from 'react';
import Link from 'next/link';

const Home = () => {
    return (
            <div className='flex flex-col gap-3 items-center justify-center min-h-screen'>
                <h1>Dashboard</h1>
                <Link href='/test' className='px-5 py-2 rounded-lg bg-black text-white cursor-pointer hover:bg-black/80 transition-colos duration-200'>Начать тест</Link>
            </div>
    );
};

export default Home;