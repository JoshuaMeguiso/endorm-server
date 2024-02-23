import { createContext, useReducer } from 'react'

export const HistoryContext = createContext()

export const historyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HISTORY':
      return { 
        history: action.payload 
      }
    case 'CREATE_HISTORY':
      return { 
        history: [action.payload, ...state.history] 
      }
    default:
      return state
  }
}

export const HistoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(historyReducer, { 
    history: null
  })

  const clearHistory = () =>{
    dispatch({type: 'SET_HISTORY', payload: ""});
  }
  
  return (
    <HistoryContext.Provider value={{ ...state, dispatch, clearHistory}}>
      { children }
    </HistoryContext.Provider>
  )
}