import { useAuthContext } from './useAuthContext'
import { useTenantsContext } from "../hooks/useTenantsContext"
import { useTransactionsContext } from  '../hooks/useTransactionsContext'
import { useHistoryContext } from '../hooks/useHistoryContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { clearTenant } = useTenantsContext()
  const { clearTransaction } = useTransactionsContext()
  const { clearHistory } = useHistoryContext()

  const logout = () => {
    //clear all context
    clearTenant();
    clearTransaction();
    clearHistory();
    
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}