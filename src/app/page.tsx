import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import React from 'react';

const Home = () => {
    return (
        <section>
            <RegisterForm />
            <LoginForm />
        </section>
    );
};

export default Home;