'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAppSelector } from '@/utils/rtk/hooks';
import { House, BookOpenText, Settings, CircleUserRound, X, Menu } from 'lucide-react';
import LogoutModal from './LogoutModal';

const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const profile = useAppSelector(state => state.profile);
    const pathname = usePathname();

    const links = [
        { label: "Главная", href: "/dashboard", icon: <House /> },
        { label: "Тестирование", href: "/tests", icon: <BookOpenText /> },
        { label: "Настройки", href: "/settings", icon: <Settings /> },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <button
                onClick={toggleMobileMenu}
                className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200'
            >
                {isMobileMenuOpen ? (
                    <X className='w-6 h-6 text-gray-700' />
                ) : (
                    <Menu className='w-6 h-6 text-gray-700' />
                )}
            </button>
            {isMobileMenuOpen && (
                <div
                    className='lg:hidden fixed top-0 left-80 right-0 bottom-0 z-40'
                    onClick={closeMobileMenu}
                />
            )}

            <aside className={`
                flex flex-col px-4 sm:px-6 lg:px-8 py-4
                fixed left-0 top-0 h-screen bg-white border-dashed border-r z-50
                transform transition-transform duration-300 ease-in-out w-80 max-w-[calc(100vw - 2rem)] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:w-80 lg:max-w-[380px] lg:min-w-[320px] lg:shadow-none shadow-2xl
                `}>

                <div className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col gap-4 lg:gap-6'>

                        <Link
                            href='/dashboard'
                            className='flex justify-center items-center h-16 lg:h-20 text-4xl transition-transform duration-300 hover:scale-105 w-fit mx-auto mt-8 lg:my-0'
                        >
                            <Image
                                src='/logo.webp'
                                alt='Logo'
                                width={80}
                                height={80}
                                className='rounded-lg lg:w-[100px] lg:h-[100px]'
                            />
                        </Link>

                        <div className='bg-[#f6f6f6] p-4 lg:p-5 rounded-lg flex items-start gap-3 lg:gap-4 mx-2 lg:mx-0'>
                            {profile.full_name && profile.avatar_url ? (
                                <Image
                                    src={profile.avatar_url}
                                    alt={profile.full_name}
                                    width={50}
                                    height={50}
                                    className='rounded-lg lg:w-[70px] lg:h-[70px] flex-shrink-0'
                                />
                            ) : (
                                <CircleUserRound
                                    color="#ffa503"
                                    strokeWidth={2}
                                    className='w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0'
                                />
                            )}
                            <div className='flex flex-col min-w-0'>
                                <div>{profile?.full_name}</div>
                                <span className='text-[#969696]'>Ученик</span>
                            </div>
                        </div>

                        <nav className='w-full px-2 lg:px-0'>
                            <ul className='flex flex-col gap-2 lg:gap-3'>
                                {links.map(({ label, href, icon }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={closeMobileMenu}
                                            className={`
                                                flex items-center gap-3 lg:gap-5 w-full py-3 lg:py-4 px-3 lg:px-4 rounded-lg hover:bg-orange-100 hover:text-black/60 transition-colors duration-200 text-sm lg:text-base ${pathname === href
                                                    ? 'bg-orange-200 text-black'
                                                    : 'bg-transparent text-[#969696]'
                                                }
                                            `}
                                        >
                                            <span className='flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6'>
                                                {icon}
                                            </span>
                                            <span className='truncate'>{label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className='px-2 lg:px-0 pb-2'>
                        <LogoutModal />
                    </div>

                </div>

            </aside>
        </>
    );
};

export default Sidebar;