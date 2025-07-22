'use client';

import React from 'react';
import { BreadcrumbWithDropdown } from '@/components/Breadcrumb';
import LoginForm from '@/components/LoginForm';

const LoginPage = () => {
    return (
        <div className='flex flex-col gap-3'>
            <BreadcrumbWithDropdown />
            <LoginForm />
        </div>
    );
};

export default LoginPage;