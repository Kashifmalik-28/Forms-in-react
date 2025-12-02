import { useMemo, useState } from 'react'
import useFilter from '../../hooks/useFilter'
import ContextMenu from './ContextMenu'

function ExpenseTable({ expenses, setExpenses, setExpenseToEdit }) {
  const [filteredData, setQuery] = useFilter(expenses, (data) => data.category)
  const [menuPosition, setMenuPosition] = useState({})
  const [rowId, setRowId] = useState('')
  const [sortCallback, setSortCallback] = useState(() => () => {})

  // ✅ Sorted and filtered data
  const sortedData = useMemo(() => {
    return [...filteredData].sort(sortCallback)
  }, [filteredData, sortCallback])

  // ✅ Calculate total
  const total = useMemo(() => {
    return sortedData.reduce(
      (acc, curr) => acc + parseFloat(curr.amount || 0),
      0
    )
  }, [sortedData])

  // ✅ Sort by Amount
  const handleAmountSort = (sortType) => {
    if (sortType === 'asc') {
      setSortCallback(() => (a, b) => a.amount - b.amount)
    } else if (sortType === 'desc') {
      setSortCallback(() => (a, b) => b.amount - a.amount)
    }
  }

  // ✅ Sort by Title (Alphabetically)
  const handleTitleSort = (sortType) => {
    if (sortType === 'asc') {
      setSortCallback(() => (a, b) => a.title.localeCompare(b.title))
    } else if (sortType === 'desc') {
      setSortCallback(() => (a, b) => b.title.localeCompare(a.title))
    }
  }

  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        setMenuPosition={setMenuPosition}
        setExpenses={setExpenses}
        setExpenseToEdit={setExpenseToEdit}
        expenses={expenses}
        rowId={rowId}
      />
      <table className="expense-table" onClick={(e) => setMenuPosition({})}>
        <thead>
          <tr>
            {/* ✅ Title Column with Sorting Arrows */}
            <th>
              <div className="title-column">
                <span>Title</span>
                <div className="sort-arrows">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={10}
                    viewBox="0 0 384 512"
                    className="arrow up-arrow"
                    onClick={() => handleTitleSort('asc')}
                    style={{ cursor: 'pointer' }}
                  >
                    <title>Sort A-Z</title>
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={10}
                    viewBox="0 0 384 512"
                    className="arrow down-arrow"
                    onClick={() => handleTitleSort('desc')}
                    style={{ cursor: 'pointer' }}
                  >
                    <title>Sort Z-A</title>
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </div>
              </div>
            </th>

            {/* Category Column */}
            <th>
              <select onChange={(e) => setQuery(e.target.value.toLowerCase())}>
                <option value="">All</option>
                <option value="grocery">Grocery</option>
                <option value="clothes">Clothes</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="medicine">Medicine</option>
              </select>
            </th>

            {/* ✅ Amount Column with Sorting Arrows */}
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={10}
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() => handleAmountSort('asc')}
                  style={{ cursor: 'pointer' }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={10}
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => handleAmountSort('desc')}
                  style={{ cursor: 'pointer' }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(({ id, title, category, amount }) => (
            <tr
              key={id}
              onContextMenu={(e) => {
                e.preventDefault()
                setMenuPosition({ left: e.clientX, top: e.clientY })
                setRowId(id)
              }}
            >
              <td>{title}</td>
              <td>{category}</td>
              <td>₹{parseFloat(amount).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <th>Total</th>
            <th></th>
            <th>₹{total.toFixed(2)}</th>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default ExpenseTable
