'use client';

import React, { useEffect } from 'react';
import { BreadcrumbWithDropdown } from '@/components/Breadcrumb';
import RegisterForm from '@/components/RegisterForm';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

const RegisterPage = () => {
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
        <div className='flex flex-col gap-3'>
            <BreadcrumbWithDropdown />
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;