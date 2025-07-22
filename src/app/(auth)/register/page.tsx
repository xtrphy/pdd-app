'use client';

import React from 'react';
import { BreadcrumbWithDropdown } from '@/components/Breadcrumb';
import RegisterForm from '@/components/RegisterForm';

const LoginForm = () => {
    return (
        <div className='flex flex-col gap-3'>
            <BreadcrumbWithDropdown />
            <RegisterForm />
        </div>
    );
};

export default LoginForm;