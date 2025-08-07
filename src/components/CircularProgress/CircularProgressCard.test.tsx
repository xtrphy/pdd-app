import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CircularProgressCard from './CircularProgressCard';
import profileReducer from '../../utils/rtk/reducers/profileSlice';
import '@testing-library/jest-dom';

jest.mock('../Tooltip', () => ({
    TooltipComponent: ({ text }: { text: string }) => <span data-testid="tooltip">{text}</span>
}));

const createMockStore = (attempts: []) => {
    return configureStore({
        reducer: {
            profile: profileReducer,
        },
        preloadedState: {
            profile: {
                id: '123',
                full_name: 'Test User',
                email: 'test@example.com',
                avatar_url: null,
                attempts
            }
        }
    });
};

describe('CircularProgressCard', () => {
    test('should display 0/40 for users without attempts', () => {
        const store = createMockStore([]);

        render(
            <Provider store={store}>
                <CircularProgressCard />
            </Provider>
        );

        expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByText('/')).toBeInTheDocument();
        expect(screen.getByText('40')).toBeInTheDocument();
        expect(screen.getByText('0%')).toBeInTheDocument();
    });

    test('should correctly calculate unique correct answers', () => {
        const mockAttempts = [
            {
                id: 1,
                answers: [
                    { questionId: 1, selected: 'A', correct: 'A' },
                    { questionId: 2, selected: 'B', correct: 'C' },
                    { questionId: 3, selected: 'D', correct: 'D' }
                ]
            },
            {
                id: 2,
                answers: [
                    { questionId: 1, selected: 'A', correct: 'A' },
                    { questionId: 4, selected: 'B', correct: 'B' },
                    { questionId: 5, selected: 'C', correct: 'D' }
                ]
            }
        ];

        const store = createMockStore(mockAttempts);

        render(
            <Provider store={store}>
                <CircularProgressCard />
            </Provider>
        );

        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('8%')).toBeInTheDocument();
    });

    test('should display tooltip with correct text', () => {
        const store = createMockStore([]);

        render(
            <Provider store={store}>
                <CircularProgressCard />
            </Provider>
        );

        expect(screen.getByTestId('tooltip')).toHaveTextContent('Количество правильно отвеченных вопросов');
    });
});