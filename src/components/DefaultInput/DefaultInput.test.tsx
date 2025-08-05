import { DefaultInput } from "./DefaultInput";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('DefaultInput', () => {
    const defaultProps = {
        type: 'text',
        placeholder: 'Test placeholder',
        value: '',
        onChange: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render with correct props', () => {
        render(<DefaultInput {...defaultProps} />);

        const input = screen.getByPlaceholderText('Test placeholder');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
        expect(input).toBeRequired();
    });

    test('should invoke onChange while typing', async () => {
        const user = userEvent.setup();
        const mockOnChange = jest.fn();

        render(<DefaultInput {...defaultProps} onChange={mockOnChange} />);

        const input = screen.getByPlaceholderText('Test placeholder');
        await user.type(input, 'test input');

        expect(mockOnChange).toHaveBeenCalledTimes(10);
        expect(mockOnChange).toHaveBeenLastCalledWith('t');
    });

    test('should display passed value', () => {
        render(<DefaultInput {...defaultProps} value="test value" />)

        const input = screen.getByDisplayValue('test value');
        expect(input).toBeInTheDocument();
    });
});