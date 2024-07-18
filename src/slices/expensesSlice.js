import { createSlice } from "@reduxjs/toolkit";
import { getExpenses } from "../actions/expensesActions";

export const initialState = {
    expenses: [],
    loading: false,
    error: null
}

export const expensesSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getExpenses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getExpenses.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.expenses = payload;
                state.error = null;
            })
            .addCase(getExpenses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const expensesReducer = expensesSlice.reducer;
