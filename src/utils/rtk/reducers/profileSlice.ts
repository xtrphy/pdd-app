import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Attempt {
    id: string;
    profile_id: string;
    created_at: string;
    correct_answers: number;
    incorrect_answers: number;
    total: number;
    type: string;
}

interface ProfileState {
    id: string;
    full_name: string;
    email: string;
    avatar_url: string | null;
    attempts: Attempt[];
}

const initialState: ProfileState = {
    id: '',
    full_name: '',
    email: '',
    avatar_url: null,
    attempts: [],
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<ProfileState>) => {
            state.id = action.payload.id
            state.full_name = action.payload.full_name
            state.email = action.payload.email
            state.avatar_url = action.payload.avatar_url
            state.attempts = action.payload.attempts
        },
        updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
            return { ...state, ...action.payload };
        },
    },
})

export const { setProfile, updateProfile } = profileSlice.actions
export default profileSlice.reducer