import { createSlice, nanoid } from '@reduxjs/toolkit';

const savedData = JSON.parse(localStorage.getItem("expensesData"));

const initialState = {
  expenses: savedData?.expenses || [],
  totalExpense: savedData?.totalExpense || 0,
};



export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    // ✅ Add expense
    addExpense: (state, action) => {
      const expenseObj = {
        id: nanoid(),
        date: Date.now(),
        text: action.payload.text,
        expense: Number(action.payload.amount),
        category: action.payload.category,
      };
      state.expenses.push(expenseObj);
      state.totalExpense += expenseObj.expense
    },

    // ✅ Edit expense
    // Todo: if expense is changed then update totalExpense
    editExpense: (state, action) => {
      const { id, ...updates } = action.payload;
      const expense = state.expenses.find(e => e.id === id); // ✅ fix here
      if (expense) {
        Object.assign(expense, updates); // Immer handles immutability
      }
    },

    deleteExpense: (state, action) => {

      const idToRemove = action.payload;

      const deleted = state.expenses.find(exp=>exp.id===idToRemove);

      state.expenses = state.expenses.filter(exp=>exp.id!==idToRemove);

      if (deleted){
        state.totalExpense -= deleted.expense;
      }
     
    }
  },
});

export const { addExpense, editExpense, deleteExpense } = expenseSlice.actions;

// ✅ Must be "export default"
export default expenseSlice.reducer;
