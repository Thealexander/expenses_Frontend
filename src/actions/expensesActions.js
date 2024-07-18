import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../utilities/axios';
import { delayedTimeout } from "../utilities/delayedTimeOut";
import { httpParams } from "../utilities/httpParams";

export const getExpenses = createAsyncThunk(
    "expenses/getExpenses",
    async (_, { rejectWithValue }) => {
        try {
            await delayedTimeout(1000);
            const response = await axios.get(`/expenses/list/`);
            return response.data;
        } catch (err) {
            return rejectWithValue(`Error: ${err.message}`);
        }
    }
);

export const getExpenseById = createAsyncThunk(
    "expenses/getExpenseById",
    async (id, { rejectWithValue }) => {
        try {
            return await axios.get(`/expenses/${id}/`);
            //await delayedTimeout(1000);
            // const response = await axios.get(`/expenses/${id}/`);
            // return response.data;
        } catch (err) {
            return rejectWithValue(`Error: ${err.message}`);
        }
    }
);

export const getExpensePagination = createAsyncThunk(
    "expenses/getExpensePagination",
    async (params, { rejectWithValue }) => {
        try {
            await delayedTimeout(1000);
            const paramString = new URLSearchParams(httpParams(params)).toString();
            const response = await axios.get(`/expenses/pagination?${paramString}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(`Error: ${err.message}`);
        }
    }
);

export const addExpense = createAsyncThunk(
    "expenses/addExpense",
    async (expenseData, { rejectWithValue }) => {
        try {
            await delayedTimeout(1000);
            const response = await axios.post(`/expenses/list/`, expenseData);
            return response.data;
        } catch (err) {
            return rejectWithValue(`Error: ${err.message}`);
        }
    }
);

export const updateExpense = createAsyncThunk(
    "expenses/updateExpense",
    async ({ id, expenseData }, { rejectWithValue }) => {
        try {
            await delayedTimeout(1000);
            const response = await axios.put(`/expenses/${id}`, expenseData);
            return response.data;
        } catch (err) {
            return rejectWithValue(`Error: ${err.message}`);
        }
    }
);

export const deleteExpense = createAsyncThunk(
    "expenses/deleteExpense",
    async (id, { rejectWithValue }) => {
        try {
            await delayedTimeout(1000);
            await axios.delete(`/expenses/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(`Error: ${err.message}`);
        }
    }
);
