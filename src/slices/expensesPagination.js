import { createSlice } from '@reduxjs/toolkit';
import { getExpensePagination } from '../actions/expensesActions';

export const initialState = {
    expenses: [],
    count: 0,
    pageIndex: 1,
    pageSize: 2,
    pageCount: 0,
    loading: false,
    resultByPage: 0,
    error: null,
    search: null,
}

export const expensePaginationSlice = createSlice({
    name: "getExpensePagination",
    initialState,
    reducers: {
        searchPagination: (state, action) => {
            state.search = action.payload.search;
            state.pageIndex = 1;
        },
        setPageIndex: (state, action) => {
            state.pageIndex = action.payload.pageIndex;
        },
        resetPagination: (state, action) => {
            state.pageIndex = 1;
            state.search = null;
        },
    },

    extraReducers: {
        [getExpensePagination.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getExpensePagination.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.expenses = payload.data;
            state.count = payload.count;
            state.pageIndex = payload.pageIndex;
            state.pageSize = payload.pageSize;
            state.pageCount = payload.pageCount;
            state.resultByPage = payload.resultByPage;
            state.error = null;
        },
        [getExpensePagination.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    searchPagination,
    setPageIndex,
    resetPagination,

} = expensePaginationSlice.actions;

export const expensePaginationReducer = expensePaginationSlice.reducer;