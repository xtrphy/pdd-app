import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
    id: string;
    full_name: string;
    email: string;
    avatar_url: string | null;
    loading: boolean;
}

const initialState: ProfileState = {
    id: '',
    full_name: '',
    email: '',
    avatar_url: null,
    loading: true,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<Omit<ProfileState, 'loading'>>) => {
            state.id = action.payload.id
            state.full_name = action.payload.full_name
            state.email = action.payload.email
            state.avatar_url = action.payload.avatar_url
        },
        updateProfile(state, action: PayloadAction<Partial<ProfileState>>) {
            return { ...state, ...action.payload };
        },
    },
})

export const { setProfile, updateProfile } = profileSlice.actions
export default profileSlice.reducer