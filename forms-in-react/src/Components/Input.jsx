import { forwardRef } from 'react'

const Input = forwardRef(({ label, name, id, onChange, error }, ref) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input 
        id={id} 
        name={name} 
        ref={ref}  // ✅ Forward the ref
        onChange={onChange}
      />
      {error && <span className="error">{error}</span>}
    </div>
  )
})

export default Input