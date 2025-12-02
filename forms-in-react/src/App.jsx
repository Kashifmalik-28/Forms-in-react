import { useState } from 'react'
import './App.css'
import ExpenseForm from './Components/ExpenseForm'
import ExpenseTable from './Components/ExpenseTable'
import expenseData from './expenseData'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  // ✅ useState ki jagah useLocalStorage use karein
  const [expenses, setExpenses] = useLocalStorage('expenses', expenseData)
  const [expenseToEdit, setExpenseToEdit] = useState(null)

  return (
    <>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
          <ExpenseForm
            setExpenses={setExpenses}
            expenseToEdit={expenseToEdit}
            setExpenseToEdit={setExpenseToEdit}
          />
          <ExpenseTable
            expenses={expenses}
            setExpenses={setExpenses}
            setExpenseToEdit={setExpenseToEdit}
          />
        </div>
      </main>
    </>
  )
}

export default App
