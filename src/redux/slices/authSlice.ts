import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin } from '../actions/authActions';
import { User } from '../../types/user.type';

interface InitialStateI {
    loading: boolean;
    userInfo: User | null;
    // userToken: string | null; 
    error: null | string;
    success: boolean;
}

const initialState:InitialStateI = {
    loading: false,
    userInfo: null, // for user object
    // userToken: null, 
    error: null,
    success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Register user
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
        }),
        builder.addCase(registerUser.fulfilled, (state) => {
            state.loading = false
            state.success = true // registration successful
        }),
        builder.addCase(registerUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload as string
        }),
        // user login
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        }),
        builder.addCase(userLogin.fulfilled, (state, {payload}) => {
            state.loading = false
            state.userInfo = payload.payload
        }),
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload as string
        })
    }
})

export default authSlice.reducer