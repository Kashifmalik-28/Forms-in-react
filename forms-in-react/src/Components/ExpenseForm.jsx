import { useRef, useState } from 'react'

function ExpenseForm({ setExpenses }) {
  const titleRef = useRef(null)
  const categoryRef = useRef(null)
  const amountRef = useRef(null)
  const [error, setError] = useState({})

  const Validate = (formsData) => {
    // 🔥 Implement form validation
    const errorsData = {}
    if (!formsData.title) {
      errorsData.title = 'Title is required'
      
    }
    if (!formsData.category) {
      errorsData.category = 'Category is required'
    }
    if (!formsData.amount) {
      errorsData.amount = 'Amount is required'
    }
    setError(errorsData)
    return errorsData
  }

  // ✅ Clear specific field error when user types
  const handleInputChange = (fieldName) => {
    setError((prevErrors) => {
      const newErrors = { ...prevErrors }
      delete newErrors[fieldName]
      return newErrors
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // ✅ FIXED: Get values from refs first
    const formsData = {
      title: titleRef.current.value,
      category: categoryRef.current.value,
      amount: amountRef.current.value,
    }

    // Now validate with the actual form data
    const validateResult = Validate(formsData)

    if (Object.keys(validateResult).length > 0) {
      return
    }

    const newExpense = {
      ...formsData,
      id: crypto.randomUUID(),
    }

    // 🔥 Add new expense to table
    setExpenses((prevState) => [...prevState, newExpense])

    // 🔄 Clear input fields and errors
    titleRef.current.value = ''
    categoryRef.current.value = ''
    amountRef.current.value = ''
    setError({})
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          ref={titleRef}
          onChange={() => handleInputChange('title')}
        />
        {error.title && <span className="error">{error.title}</span>}
      </div>

      <div className="input-container">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          ref={categoryRef}
          onChange={() => handleInputChange('category')}
        >
          <option value="" hidden>
            Select Category
          </option>
          <option value="grocery">Grocery</option>
          <option value="clothes">Clothes</option>
          <option value="bills">Bills</option>
          <option value="education">Education</option>
          <option value="medicine">Medicine</option>
        </select>
        {error.category && <span className="error">{error.category}</span>}
      </div>

      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          ref={amountRef}
          onChange={() => handleInputChange('amount')}
        />
        {error.amount && <span className="error">{error.amount}</span>}
      </div>

      <button className="add-btn">Add</button>
    </form>
  )
}

export default ExpenseForm
