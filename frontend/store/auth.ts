import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { authMode: 'join' | 'login' } = {
    authMode: 'join',
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthMode(state, action: PayloadAction<'join' | 'login'>) {
            state.authMode = action.payload;
        },
    },
});

export const authActions = { ...auth.actions };

export default auth;
