import { useRef } from 'react'

function ExpenseForm({ setExpenses }) {
  const titleRef = useRef(null)
  const categoryRef = useRef(null)
  const amountRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const newExpense = {
      title: titleRef.current.value,
      category: categoryRef.current.value,
      amount: amountRef.current.value,
      id: crypto.randomUUID(),
    }

    // 🔥 Add new expense to table
    setExpenses((prevState) => [...prevState, newExpense])

    // 🔄 Clear input fields
    titleRef.current.value = ''
    categoryRef.current.value = ''
    amountRef.current.value = ''
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" ref={titleRef} />
      </div>

      <div className="input-container">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" ref={categoryRef}>
          <option value="" hidden>
            Select Category
          </option>
          <option value="grocery">Grocery</option>
          <option value="clothes">Clothes</option>
          <option value="bills">Bills</option>
          <option value="education">Education</option>
          <option value="medicine">Medicine</option>
        </select>
      </div>

      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input id="amount" name="amount" ref={amountRef} />
      </div>

      <button className="add-btn">Add</button>
    </form>
  )
}

export default ExpenseForm
