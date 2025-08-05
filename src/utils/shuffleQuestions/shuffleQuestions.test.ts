import { shuffleQuestions } from "./shuffleQuestions";

describe('shuffleQuestions', () => {
    const mockQuestions = [
        { id: 1, text: 'Question 1' },
        { id: 2, text: 'Question 2' },
        { id: 3, text: 'Question 3' },
    ];

    test('should return array with the same length', () => {
        const result = shuffleQuestions(mockQuestions);
        expect(result).toHaveLength(mockQuestions.length);
    });

    test('should contain all elements', () => {
        const result = shuffleQuestions(mockQuestions);
        mockQuestions.forEach(question => {
            expect(result).toContainEqual(question);
        });
    });

    test('should return an empty array', () => {
        const result = shuffleQuestions([]);
        expect(result).toEqual([]);
    });
});