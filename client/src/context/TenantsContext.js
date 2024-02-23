import { createContext, useReducer } from 'react'

export const TenantsContext = createContext()

export const tenantsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TENANTS':
      return { 
        tenants: action.payload 
      }
    case 'CREATE_TENANT':
      return { 
        tenants: [action.payload, ...state.tenants] 
      }
    default:
      return state
  }
}

export const TenantsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tenantsReducer, { 
    tenants: null
  })

  const clearTenant = () =>{
    dispatch({type: 'SET_TENANTS', payload: ""});
  }
  
  return (
    <TenantsContext.Provider value={{ ...state, dispatch, clearTenant }}>
      { children }
    </TenantsContext.Provider>
  )
}