'use client';

import React, { useEffect } from 'react';
import { BreadcrumbWithDropdown } from '@/components/Breadcrumb';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

const LoginPage = () => {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                router.replace('/dashboard');
            }
        }

        checkAuth();
    }, [router]);

    return (
        <div className='flex flex-col gap-3 p-6'>
            <BreadcrumbWithDropdown />
            <LoginForm />
        </div>
    );
};

export default LoginPage;