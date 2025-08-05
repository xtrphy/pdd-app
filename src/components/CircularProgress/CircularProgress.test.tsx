import CircularProgress from "./CircularProgress";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';

describe('CircularProgress', () => {
    test('должен отображать правильный процент', () => {
        render(<CircularProgress value={25} max={100} />);

        expect(screen.getByText('25%')).toBeInTheDocument();
    });

    test('should not be higher than 100%', () => {
        render(<CircularProgress value={150} max={100} />);

        expect(screen.getByText('100%')).toBeInTheDocument();
    });

    test('should not be lower than 0%', () => {
        render(<CircularProgress value={-10} max={100} />);

        expect(screen.getByText('0%')).toBeInTheDocument();
    });

    test('should correctly calculate percents for different max values', () => {
        render(<CircularProgress value={20} max={40} />);

        expect(screen.getByText('50%')).toBeInTheDocument();
    });
});