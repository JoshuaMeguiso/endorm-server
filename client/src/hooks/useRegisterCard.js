import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useRegisterCard = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate();

  const registerCard = async (tenant_ID, rfid) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`/user/${tenant_ID}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ rfid })
    })
    const json = await response.json()
    if (response.ok) {
      setIsLoading(false)
      navigate(-1);
    }
    else{
    setIsLoading(false)
    setError(json.error)
    }
  }

  return { registerCard, isLoading, error}
}