function ContextMenu({ menuPosition, setMenuPosition, setExpenses, setExpenseToEdit, expenses, rowId }) {
  if (!menuPosition.left) return
  
  return (
    <>
      <div className="context-menu" style={{ ...menuPosition }}>
        <div
          onClick={() => {
            // ✅ Find the expense and set it for editing
            const expenseToEdit = expenses.find((expense) => expense.id === rowId)
            setExpenseToEdit(expenseToEdit)
            setMenuPosition({})
          }}
        >
          Edit
        </div>
        <div
          onClick={() => {
            setExpenses((prevState) =>
              prevState.filter((expense) => expense.id !== rowId)
            )
            setMenuPosition({})
          }}
        >
          Delete
        </div>
      </div>
    </>
  )
}

export default ContextMenu