import { useRef, useState, useEffect } from 'react'
import Input from './Input'
import Select from './Select'

function ExpenseForm({ setExpenses, expenseToEdit, setExpenseToEdit }) {
  const titleRef = useRef(null)
  const categoryRef = useRef(null)
  const amountRef = useRef(null)
  const [error, setError] = useState({})

  // ✅ Populate form when editing
  useEffect(() => {
    if (expenseToEdit) {
      titleRef.current.value = expenseToEdit.title
      categoryRef.current.value = expenseToEdit.category
      amountRef.current.value = expenseToEdit.amount
    }
  }, [expenseToEdit])

  const validationConfig = {
    title: [
      { required: true, message: 'Title is required' },
      { minLength: 5, message: 'Title must be at least 5 characters long' },
    ],
    category: [
      { required: true, message: 'Category is required' }
    ],
    amount: [
      { required: true, message: 'Amount is required' },
      { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: 'Please enter a valid amount' }
    ],
  }

  const Validate = (formsData) => {
    const errorsData = {}
    
    Object.entries(validationConfig).forEach(([key, rules]) => {
      rules.forEach((rule) => {
        if (errorsData[key]) return
        
        if (rule.required && !formsData[key]) {
          errorsData[key] = rule.message
          return
        }
        
        if (rule.minLength && formsData[key] && formsData[key].length < rule.minLength) {
          errorsData[key] = rule.message
          return
        }
        
        if (rule.pattern && formsData[key] && !rule.pattern.test(formsData[key])) {
          errorsData[key] = rule.message
          return
        }
      })
    })
    
    setError(errorsData)
    return errorsData
  }

  const handleInputChange = (e) => {
    const fieldName = e.target.name
    setError((prevErrors) => {
      const newErrors = { ...prevErrors }
      delete newErrors[fieldName]
      return newErrors
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const formsData = {
      title: titleRef.current.value,
      category: categoryRef.current.value,
      amount: amountRef.current.value,
    }

    const validateResult = Validate(formsData)

    if (Object.keys(validateResult).length > 0) {
      return
    }

    if (expenseToEdit) {
      // ✅ Update existing expense
      setExpenses((prevState) =>
        prevState.map((expense) =>
          expense.id === expenseToEdit.id
            ? { ...formsData, id: expense.id }
            : expense
        )
      )
      setExpenseToEdit(null) // Clear edit mode
    } else {
      // ✅ Add new expense
      const newExpense = {
        ...formsData,
        id: crypto.randomUUID(),
      }
      setExpenses((prevState) => [...prevState, newExpense])
    }

    // Clear form
    titleRef.current.value = ''
    categoryRef.current.value = ''
    amountRef.current.value = ''
    setError({})
  }

  // ✅ Cancel edit mode
  const handleCancel = () => {
    setExpenseToEdit(null)
    titleRef.current.value = ''
    categoryRef.current.value = ''
    amountRef.current.value = ''
    setError({})
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        name="title"
        id="title"
        ref={titleRef}
        onChange={handleInputChange}
        error={error.title}
      />

      <Select
        label="Category"
        name="category"
        id="category"
        ref={categoryRef}
        onChange={handleInputChange}
        error={error.category}
        options={[
          { value: '', label: 'Select Category', hidden: true },
          { value: 'grocery', label: 'Grocery' },
          { value: 'clothes', label: 'Clothes' },
          { value: 'bills', label: 'Bills' },
          { value: 'education', label: 'Education' },
          { value: 'medicine', label: 'Medicine' },
        ]}
      />

      <Input
        label="Amount"
        name="amount"
        id="amount"
        type="number"
        ref={amountRef}
        onChange={handleInputChange}
        error={error.amount}
      />
      
      <button className="add-btn" type="submit">
        {expenseToEdit ? 'Update' : 'Add'} {/* ✅ Dynamic button text */}
      </button>
      
      {expenseToEdit && (
        <button 
          type="button" 
          className="cancel-btn" 
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  )
}

export default ExpenseForm