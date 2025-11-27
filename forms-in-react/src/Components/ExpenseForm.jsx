import { useRef, useState } from 'react'
import Input from './Input'
import Select from './Select'

function ExpenseForm({ setExpenses }) {
  const titleRef = useRef(null)
  const categoryRef = useRef(null)
  const amountRef = useRef(null)
  const [error, setError] = useState({})

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
    
    // Loop through each field in validationConfig
    Object.entries(validationConfig).forEach(([key, rules]) => {
      // Loop through each rule for the field
      rules.forEach((rule) => {
        // Skip if error already exists for this field
        if (errorsData[key]) return
        
        // Check required validation
        if (rule.required && !formsData[key]) {
          errorsData[key] = rule.message
          return
        }
        
        // Check minLength validation
        if (rule.minLength && formsData[key] && formsData[key].length < rule.minLength) {
          errorsData[key] = rule.message
          return
        }
        
        // Check pattern validation (for amount)
        if (rule.pattern && formsData[key] && !rule.pattern.test(formsData[key])) {
          errorsData[key] = rule.message
          return
        }
      })
    })
    
    setError(errorsData)
    return errorsData
  }

  // ✅ Clear specific field error when user types
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
    
    // ✅ Get values from refs first
    const formsData = {
      title: titleRef.current.value,
      category: categoryRef.current.value,
      amount: amountRef.current.value,
    }

    // Validate form data
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
      
      <button className="add-btn">Add</button>
    </form>
  )
}

export default ExpenseForm