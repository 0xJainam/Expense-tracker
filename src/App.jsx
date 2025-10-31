import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AddExpense from "./components/AddExpense";
import ExpenseContainer from "./components/expenseContainer";

function App() {
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const expenses = useSelector((state) => state.expense.expenses);
  const totalExpense = useSelector((state) => state.expense.totalExpense);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const dataToSave = { expenses, totalExpense };
    localStorage.setItem("expensesData", JSON.stringify(dataToSave));
  }, [expenses, totalExpense]);

  return (
    <>
      <h1>Expense Tracker</h1>

      <AddExpense
        editingExpenseId={editingExpenseId}
        setEditingExpenseId={setEditingExpenseId}
      />

      <ExpenseContainer setEditingExpenseId={setEditingExpenseId} />

      <p>Total Expense: {totalExpense}</p>
    </>
  );
}

export default App;
