import { createSlice } from "@reduxjs/toolkit";
import { addExpense } from "../actions/expensesActions";

export const initialState = {
    loading: false,
    success: false,
    error: null,
};

export const expenseCreateSlice = createSlice({
    name: "expenseCreate",
    initialState,
    reducers: {
        resetCreate: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: {
        [addExpense.pending]: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        [addExpense.fulfilled]: (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        [addExpense.rejected]: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
    },
});

export const { resetCreate } = expenseCreateSlice.actions;
export const expenseCreateReducer = expenseCreateSlice.reducer;
