import { useState } from 'react'

function useFilter(datalist, callback) {
  const [query, setQuery] = useState('')

  const filteredData = datalist.filter((data) =>
    callback(data).toLowerCase().includes(query)
  )

  return [filteredData, setQuery]
}

export default useFilter
