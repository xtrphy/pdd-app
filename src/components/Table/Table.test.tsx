import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';
import '@testing-library/jest-dom';
import { Attempt } from '@/utils/rtk/reducers/profileSlice';

jest.mock('../Tooltip', () => ({
    TooltipComponent: ({ text }: { text: string }) => <span data-testid="tooltip">{text}</span>
}));

describe('Table', () => {
    test('pagination should work', () => {
        const manyAttempts: Attempt[] = Array.from({ length: 15 }, (_, i) => ({
            id: 'abc' + i,
            profile_id: '2',
            created_at: '2025-01-15T14:30:00Z',
            correct_answers: 35,
            incorrect_answers: 5,
            total: 40,
            answers: [],
            type: 'Экзамен',
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