'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { House, BookOpenText, Settings, CircleUserRound } from 'lucide-react';
import Modal from './Modal';

const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { label: "Главная", href: "/dashboard", icon: <House /> },
        { label: "Тестирование", href: "/tests", icon: <BookOpenText /> },
        { label: "Настройки", href: "/settings", icon: <Settings /> },
    ];

    return (
        <aside className='flex flex-col px-8 py-4 left-0 top-0 max-w-[380px] border-dashed border-r-1 min-h-screen'>

            <div className='flex flex-col justify-between h-full flex-grow'>

                <div className='flex flex-col gap-6'>
                    <div className='flex justify-center items-center h-20 text-4xl'>
                        <Image
                            src='/logo.webp'
                            alt='Logo'
                            width={70}
                            height={70}
                            className='rounded-lg'
                        />
                    </div>

                    <div className='bg-[#f6f6f6] p-5 rounded-lg flex items-start gap-4'>
                        <CircleUserRound color="#ffa503" strokeWidth={2} height={50} width={100} />
                        <div className='flex flex-col'>
                            <div>Перепечкин Владислав Николаевич</div>
                            <span className='text-[#969696]'>Ученик</span>
                        </div>
                    </div>

                    <nav className='w-full'>
                        <ul className='flex flex-col gap-3'>
                            {links.map(({ label, href, icon }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={`flex items-center gap-5 w-full py-4 px-4 rounded-lg hover:bg-orange-100 hover:text-black/60 transition-colors duration-200 ${pathname === href
                                            ? 'bg-orange-200 text-black'
                                            : 'bg-transparent text-[#969696]'
                                            }`}
                                    >
                                        {icon}
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <Modal />

            </div>

        </aside>
    );
};

export default Sidebar;