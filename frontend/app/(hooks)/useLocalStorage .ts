'use client'

import { useEffect, useState } from 'react'

type StoredValue<T> = T

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [
  StoredValue<T>,
  React.Dispatch<React.SetStateAction<StoredValue<T>>>,
  () => void,
] => {
  const isClient = typeof window !== 'undefined'

  const storedValue = isClient ? localStorage.getItem(key) : null
  const initial: StoredValue<T> = storedValue
    ? JSON.parse(storedValue)
    : initialValue

  const [value, setValue] = useState<StoredValue<T>>(initial)

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [isClient, key, value])

  const clearLocalStorage = () => {
    if (isClient) {
      localStorage.removeItem(key)
    }
  }

  return [value, setValue, clearLocalStorage]
}

export default useLocalStorage
