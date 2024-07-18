import { createSlice } from '@reduxjs/toolkit';
import { loadUser, login, register } from '../actions/userActions';

const initialState = {
    loading: false,
    errors: [],
    isAuthenticated: false,
    user: null,

};

export const securitySlice = createSlice({
    name: "security",
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("token");
            state.isAuthenticated = false;
            state.user = null;
        },

        resetUpdateStatus: (state, action) => {
            state.isUpdated = false;
        },
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true;
            state.errors = [];
        },
        [login.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user = payload;
            state.errors = [];
            state.isAuthenticated = true;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.errors = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },

        [register.pending]: (state) => {
            state.loading = true;
            state.error = []
        },
        [register.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user = payload;
            state.errors = [];
            state.isAuthenticated = true;
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.errors = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },

        [loadUser.pending]: (state) => {
            state.loading = true;
            state.errores = []
        },
        [loadUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user = payload;
            state.errors = [];
            state.isAuthenticated = true;

        },
        [loadUser.rejected]: (state, action) => {
            state.loading = false;
            state.errors = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },
    }
});

export const { logout, resetUpdateStatus } = securitySlice.actions;
export const securityReducer = securitySlice.reducer;