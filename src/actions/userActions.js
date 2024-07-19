import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";
import { delayedTimeout } from "../utilities/delayedTimeOut";

// Login action
export const login = createAsyncThunk(
    "user/login",
    async (params, { rejectWithValue }) => {
        try {
            const requestConfig = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `/account/login-app/`,
                params,
                requestConfig
            );

            localStorage.setItem("token", data.token.access);
            await delayedTimeout(1000);

            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Register action
export const register = createAsyncThunk(
    "user/register",
    async (params, { rejectWithValue }) => {
        try {
            const requestConfig = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `/account/register/`,
                params,
                requestConfig
            );

            localStorage.setItem("token", data.token.access);
            await delayedTimeout(1000);

            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Logout action
export const logout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const requestConfig = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            await axios.post(
                `/account/logout/`,
                {},
                requestConfig
            );

            localStorage.removeItem("token");
            await delayedTimeout(1000);

            return {};
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
// session of the user
export const loadUser = createAsyncThunk(
    "user/getUser",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/account/user/profile/`);
            localStorage.setItem("token", data.token);
            await delayedTimeout(1000);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);