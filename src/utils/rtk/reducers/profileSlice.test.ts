import { configureStore, type EnhancedStore } from "@reduxjs/toolkit";
import profileReducer, { setProfile, updateProfile } from './profileSlice';
import type { RootState } from "../store";

describe('profileSlice', () => {
    let store: EnhancedStore<RootState>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                profile: profileReducer
            }
        });
    });

    test('should set profile', () => {
        const profileData = {
            id: '123',
            full_name: 'Ivan Ivanov',
            email: 'ivan@example.com',
            avatar_url: null,
            attempts: [],
        };

        store.dispatch(setProfile(profileData));

        const state = store.getState().profile;
        expect(state).toEqual(profileData);
    });

    test('should update profile', () => {
        const initialProfile = {
            id: '123',
            full_name: 'Ivan Ivanov',
            email: 'ivan@example.com',
            avatar_url: null,
            attempts: [],
        };

        store.dispatch(setProfile(initialProfile));

        const updateData = {
            full_name: 'Vlad Perepechkin',
            avatar_url: 'https://example.com/avatar.jpg'
        };

        store.dispatch(updateProfile(updateData));

        const state = store.getState().profile;
        expect(state.full_name).toBe('Vlad Perepechkin');
        expect(state.avatar_url).toBe('https://example.com/avatar.jpg');
        expect(state.email).toBe('ivan@example.com');
    });
});