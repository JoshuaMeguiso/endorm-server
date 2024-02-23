import { TransactionsContext } from "../context/TransactionsContext";
import { useContext } from "react";

export const useTransactionsContext = () => { 
    const context = useContext(TransactionsContext)

    if(!context){
        throw Error('useTenantsContext must be used inside an TenantsContextProvider')
    }

    return context
}