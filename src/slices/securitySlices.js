import { createSlice } from '@reduxjs/toolkit';
import { loadUser, login, register } from '../actions/userActions';

const initialState = {
    loading: false,
    errorx: [],
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
            state.errorx = [];
        },
        [login.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user = payload;
            state.errorx = [];
            state.isAuthenticated = true;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.errorx = action.payload;
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
            state.errorx = [];
            state.isAuthenticated = true;
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.errorx = action.payload;
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
            state.errorx = [];
            state.isAuthenticated = true;

        },
        [loadUser.rejected]: (state, action) => {
            state.loading = false;
            state.errorx = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },
    }
});

export const { logout, resetUpdateStatus } = securitySlice.actions;
export const securityReducer = securitySlice.reducer;