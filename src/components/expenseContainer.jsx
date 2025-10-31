import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense } from "../features/Expenses/expensesSlice";

function ExpenseContainer({ setEditingExpenseId }) {
  const expenses = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>All Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.text} — ₹{expense.expense} ({expense.category})
            <button onClick={() => dispatch(deleteExpense(expense.id))}>Delete</button>
            <button onClick={() => setEditingExpenseId(expense.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseContainer;
