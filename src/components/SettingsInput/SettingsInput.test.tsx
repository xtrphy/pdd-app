import { SettingsInput } from "./SettingsInput";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

describe('SettingsInput', () => {
    const defaultProps = {
        label: 'Test Label',
        htmlFor: 'text',
        value: '',
        onChange: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should be rendered with correct label', () => {
        render(<SettingsInput {...defaultProps} />);

        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    test('should be disabled while disabled=true', () => {
        render(<SettingsInput {...defaultProps} disabled={true} />);

        const input = screen.getByLabelText('Test Label');
        expect(input).toBeDisabled();
    });

    test('should invoke onChange', async () => {
        const user = userEvent.setup();
        const mockOnChange = jest.fn();

        render(<SettingsInput {...defaultProps} onChange={mockOnChange} />);

        const input = screen.getByLabelText('Test Label');
        await user.type(input, 'new value');

        expect(mockOnChange).toHaveBeenCalledTimes(9);
        expect(mockOnChange).toHaveBeenLastCalledWith('e');
    });

    test('should display passed value', () => {
        render(<SettingsInput {...defaultProps} value="test value" />);

        const input = screen.getByDisplayValue('test value');
        expect(input).toBeInTheDocument();
    });
});