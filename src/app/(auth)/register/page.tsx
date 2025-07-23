'use client';

import React from 'react';
import { BreadcrumbWithDropdown } from '@/components/Breadcrumb';
import RegisterForm from '@/components/RegisterForm';

const RegisterPage = () => {
    return (
        <div className='flex flex-col gap-3'>
            <BreadcrumbWithDropdown />
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;