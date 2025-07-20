import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
    id: string;
    full_name: string;
    email: string;
}

const initialState: ProfileState = {
    id: '',
    full_name: '',
    email: '',
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<ProfileState>) => {
            state.id = action.payload.id
            state.full_name = action.payload.full_name
            state.email = action.payload.email
        },
        clearProfile: () => initialState,
    },
})

export const { setProfile, clearProfile } = profileSlice.actions
export default profileSlice.reducer