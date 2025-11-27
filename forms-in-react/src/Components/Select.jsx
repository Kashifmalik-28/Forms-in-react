import { forwardRef } from 'react'

const Select = forwardRef(({ label, name, id, onChange, error, options }, ref) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select 
        id={id} 
        name={name}
        ref={ref}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option 
            key={index} 
            value={option.value}
            hidden={option.hidden}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error">{error}</span>}
    </div>
  )
})

export default Select