import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/Expenses/expensesSlice";

export const store = configureStore({
  reducer: {
    expense: expenseReducer, // ✅ correct
  },
});
