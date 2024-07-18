import { createSlice } from "@reduxjs/toolkit";
import { getExpenseById } from "../actions/expensesActions";


export const initialState = {
    expense: null,
    loading: false,
    error: null,
};

export const expenseByIdSlice = createSlice({
    name: "expenseByIdSlice",
    initialState,
    reducers: {
        resetGetById: (state, action) => {
            state.loading = false;
            state.error = null;
            state.expense = null;
        }
    },
    extraReducers: {
        [getExpenseById.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getExpenseById.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.expense = payload.data;
            state.error = null;
        },
        [getExpenseById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { resetGetById } = expenseByIdSlice.actions;
export const expenseByIdReducer = expenseByIdSlice.reducer;
