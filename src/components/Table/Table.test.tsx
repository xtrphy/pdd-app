import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';
import '@testing-library/jest-dom';

jest.mock('../Tooltip', () => ({
    TooltipComponent: ({ text }: { text: string }) => <span data-testid="tooltip">{text}</span>
}));

jest.mock('../../utils/formatDate/formatDate.ts', () => ({
    formatDate: (dateString) => ({
        date: '15.01.2025',
        time: '14:30'
    })
}));

describe('Table', () => {
    const mockAttempts: any[] = [
        {
            id: 1,
            type: 'Экзамен',
            created_at: '2025-01-15T14:30:00Z',
            correct_answers: 35,
            incorrect_answers: 5
        },
        {
            id: 2,
            type: 'Экзамен',
            created_at: '2025-01-15T10:15:00Z',
            correct_answers: 30,
            incorrect_answers: 10
        }
    ];

    test('pagination should work', () => {
        const manyAttempts = Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            type: 'Экзамен',
            created_at: '2025-01-15T14:30:00Z',
            correct_answers: 35,
            incorrect_answers: 5
        }));

        render(<Table attempts={manyAttempts} />);

        const nextButton = screen.getByLabelText('Следующая страница');
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).not.toBeDisabled();

        const prevButton = screen.getByLabelText('Предыдущая страница');
        expect(prevButton).toBeDisabled();

        fireEvent.click(nextButton);
        expect(prevButton).not.toBeDisabled();
    });
});