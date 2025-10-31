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
        expense: Number(action.payload.expense),
        category: action.payload.category,
      };
      state.expenses.push(expenseObj);
      state.totalExpense += expenseObj.expense
    },

    // ✅ Edit expense
    // Todo: if expense is changed then update totalExpense
    editExpense: (state, action) => {
  const { id, text, category, expense } = action.payload;
  const existing = state.expenses.find((exp) => exp.id === id);

  if (existing) {
    existing.text = text;
    existing.category = category;
    existing.expense = expense;
  }

  state.totalExpense = state.expenses.reduce(
    (total, exp) => total + exp.expense,
    0
  );
}

,

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
