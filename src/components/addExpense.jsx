import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./add-exp.css";
import { addExpense, editExpense } from "../features/Expenses/expensesSlice";

function AddExpense({ editingExpenseId, setEditingExpenseId }) {
  const [text, setText] = useState("");
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("");

  const expenses = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();

  // Load data into form when editingExpenseId changes
  useEffect(() => {
    if (editingExpenseId) {
      const item = expenses.find((exp) => exp.id === editingExpenseId);
      if (item) {
        setText(item.text);
        setExpense(item.expense);
        setCategory(item.category);
      }
    } else {
      setText("");
      setExpense("");
      setCategory("");
    }
  }, [editingExpenseId, expenses]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingExpenseId) {
      dispatch(editExpense({ id: editingExpenseId, text, expense: Number(expense), category }));
      setEditingExpenseId(null); // exit edit mode
    } else {
      dispatch(addExpense({ text, expense: Number(expense), category }));
    }

    setText("");
    setExpense("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-exp">
        <input
          type="text"
          id="notes"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Your expense"
          required
        />

        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select an option</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="shopping">Shopping</option>
          <option value="others">Others</option>
        </select>

        <input
          type="number"
          id="money"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          required
        />
      </div>

      <button type="submit">{editingExpenseId ? "Update" : "Add"}</button>
    </form>
  );
}

export default AddExpense;
