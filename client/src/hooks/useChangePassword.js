import { useState } from 'react'
import { useLogout } from '../hooks/useLogout';

export const useChangePassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { logout } = useLogout();

  const change_Pass = async (user_Name, password, password1, password2) => {
    setIsLoading(true)
    setError(null)

    if(password === '' || password1 === '' || password2 === ''){
      setIsLoading(false)
      setError('All fields must be filled')
    }
    else{
      //Check if it is the old password by login
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ user_Name, password })
      })
      const json = await response.json()

      if (response.ok) { //if response okay, proceed
        //Check if the password 1 and 2 is the same
        if(password1 === password2){
          //Update password
          password = password1;
          const response = await fetch('/user/login/update', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ user_Name, password })
            })
          const json = await response.json()
          if (!response.ok) { //if response is not okay, return error 
              setIsLoading(false)
              setError(json.error)
          }
          if (response.ok) { //if response is okay, logout
            // update loading state
            setIsLoading(false)
            logout()
          }
        }
        //if not the same, return error
        else{
          setIsLoading(false)
          setError('Password Does not Match')
        }
      }
      else{ //if response is not okay, return error
        setIsLoading(false)
        setError(json.error)
      }
    }
  }

  return { change_Pass, isLoading, error }
}