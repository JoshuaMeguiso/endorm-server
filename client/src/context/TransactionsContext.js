import { createContext, useReducer } from 'react'

export const TransactionsContext = createContext()

export const transactionsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { 
        transactions: action.payload 
      }
    case 'CREATE_TRANSACTION':
      return { 
        transactions: [action.payload, ...state.transactions] 
      }
    default:
      return state
  }
}

export const TransactionsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionsReducer, { 
    transactions: null
  })

  const clearTransaction = () =>{
    dispatch({type: 'SET_TRANSACTIONS', payload: ""});
  }
  
  return (
    <TransactionsContext.Provider value={{ ...state, dispatch, clearTransaction }}>
      { children }
    </TransactionsContext.Provider>
  )
}