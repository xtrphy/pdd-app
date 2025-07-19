import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Answer {
    questionId: string;
    selectedOptionId: string;
}

interface TestState {
    currentIndex: number;
    answers: Answer[]
    status: 'idle' | 'in-progress' | 'completed'
}

const initialState: TestState = {
    currentIndex: 0,
    answers: [],
    status: 'idle',
}

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        startTest(state) {
            state.currentIndex = 0
            state.answers = []
            state.status = 'in-progress'
        },
        selectAnswer(state, action: PayloadAction<Answer>) {
            const existing = state.answers.find(
                (a) => a.questionId === action.payload.questionId
            )
            if (existing) {
                existing.selectedOptionId = action.payload.selectedOptionId
            } else {
                state.answers.push(action.payload)
            }
        },
        nextQuestion(state) {
            state.currentIndex += 1
        },
        finishTest(state) {
            state.status = 'completed'
        },
        resetTest(state) {
            state.currentIndex = 0
            state.answers = []
            state.status = 'idle'
        },
    },
})

export const {
    startTest,
    selectAnswer,
    nextQuestion,
    finishTest,
    resetTest,
} = testSlice.actions

export default testSlice.reducer