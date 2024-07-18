import { configureStore } from "@reduxjs/toolkit";
import { expensesReducer } from "./slices/expensesSlice";
import { expenseByIdReducer } from "./slices/expensesByIdSlice";
//import { securityReducer } from "./slices/securitySlice";


export default configureStore({
    reducer: {
        expenses: expensesReducer,
        expense: expenseByIdReducer,
        //productPagination: productPaginationReducer,
        //security: securityReducer,


    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})