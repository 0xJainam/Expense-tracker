import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addExpense} from '../features/Expenses/expenseSlice'

//use the class names in jsx

function AddExpense(){

    const [text, setText] = React.useState("")
    const [expense,setExpense] = React.useState(0);
    const [category,setCategory] = React.useState("");
    const dispatch = useDispatch()

    const addExpenseHandler = (e) => {
        e.preventDefault()
        dispatch(addExpense({text,expense,category}))
        
        setText('')
        setExpense(0);
        setCategory('');
    };



    return (
        <form onSubmit={addExpenseHandler}>
            <input 
            type="text"
            
            value = {text}
            onChange={(e)=>setText(e.target.value)}
            placeholder='Enter Your expense'
            />
            <input
            type="number"
            required
            value = {Number(expense)}
            onChange={(e)=>setExpense(e.target.value)}
            placeholder='0'

            />

            <select 
            value={category}
            required
            onChange={(e)=> setCategory(e.target.value)}>
                <option value="">Select an option</option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="shoppoing">Shopping</option>
                <option value="others">Others</option>
            </select>



            <button type="submit">Add</button>
            
            
        </form>

    )
}

export default AddExpense;