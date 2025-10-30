import { useSelector } from "react-redux";
import { useEffect } from "react";


function App() {
  
  useEffect(() => {
  const dataToSave = {
    expenses,
    totalExpense,
  };
  localStorage.setItem("expensesData", JSON.stringify(dataToSave));
}, [expenses, totalExpense]);


 
  
  return (
    <>
      
    </>
  )
}

export default App
