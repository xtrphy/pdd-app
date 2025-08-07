import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import { supabase } from "@/utils/supabaseClient";
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

jest.mock('../../utils/supabaseClient', () => ({
    supabase: {
        auth: {
            signInWithPassword: jest.fn()
        }
    }
}));

jest.mock('next/image', () => {
    return function MockImage({ src, alt, ...props }) {
        return <img src={src} alt={alt} {...props} />;
    };
});

describe('LoginForm', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        useRouter.mockReturnValue({
            push: mockPush
        });
        jest.clearAllMocks();
    });

    test('should successfully authorize user', async () => {
        const user = userEvent.setup();
        supabase.auth.signInWithPassword.mockResolvedValue({
            data: { user: { id: '123' } },
            error: null,
        });

        render(<LoginForm />);

        await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
        await user.type(screen.getByPlaceholderText('Пароль'), 'password123');
        await user.click(screen.getByRole('button', { name: 'Войти' }));

        await waitFor(() => {
            expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123'
            });
            expect(mockPush).toHaveBeenCalledWith('/dashboard');
        });
    });

    test('should show error if authorization failed', async () => {
        const user = userEvent.setup();
        const errorMessage = 'Invalid credentials';
        supabase.auth.signInWithPassword.mockResolvedValue({
            data: null,
            error: { message: errorMessage }
        });

        render(<LoginForm />);

        await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
        await user.type(screen.getByPlaceholderText('Пароль'), 'wrongpassword');
        await user.click(screen.getByLabelText('Войти'));

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

    test('should require fields to be filled in', () => {
        render(<LoginForm />);

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Пароль');

        expect(emailInput).toBeRequired();
        expect(passwordInput).toBeRequired();
    });
});