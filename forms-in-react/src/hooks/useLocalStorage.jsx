import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue) {
  // ✅ State initialize karein - localStorage se load karein ya initialValue use karein
  const [value, setValue] = useState(() => {
    try {
      // localStorage se data fetch karein
      const item = window.localStorage.getItem(key)
      // Agar data hai to parse kar kah return karein, warna initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
      return initialValue
    }
  })

  // ✅ Jab bhi value change ho, localStorage mein save karein
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
