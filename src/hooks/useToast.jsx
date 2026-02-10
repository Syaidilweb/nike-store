import { useState, useCallback } from "react"

export function useToast() {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now()
    const newToast = { id, message, type, duration }
    
    setToasts((prev) => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }, [removeToast])

  return {
    toasts,
    showToast,
    removeToast
  }
}