import { useState } from 'react'
import './App.css'
import ExpenseForm from './Components/ExpenseForm'
import ExpenseTable from './Components/ExpenseTable'
import expenseData from './expenseData'

function App() {
  const [expenses, setExpenses] = useState(expenseData)
  const [expenseToEdit, setExpenseToEdit] = useState(null) // ✅ New state

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
