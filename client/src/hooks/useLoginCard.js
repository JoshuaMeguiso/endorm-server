import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLoginCard = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const loginCard = async (rfid) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/user/login/card', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ rfid })
    })
    const json = await response.json()
    if(json.user_Type === 'admin'){
      setIsLoading(false)
      setError('Please login in the mobile app')
    }
    else{
      if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
      }
      if (response.ok) {
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(json))
  
        // update the auth context
        dispatch({type: 'LOGIN', payload: json})
  
        // update loading state
        setIsLoading(false)
      }
    }
  }

  return { loginCard, isLoading, error }
}