import { formatDate } from "./formatDate";

describe('formatDate', () => {
    test('format date and time correctly', () => {
        const isoString = '2025-01-15T14:30:00Z';
        const result = formatDate(isoString);

        expect(result).toHaveProperty('date');
        expect(result).toHaveProperty('time');
        expect(typeof result.date).toBe('string');
        expect(typeof result.time).toBe('string');
    });
});