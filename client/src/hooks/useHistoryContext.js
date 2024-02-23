import { HistoryContext } from "../context/HistoryContext";
import { useContext } from "react";

export const useHistoryContext = () => { 
    const context = useContext(HistoryContext)

    if(!context){
        throw Error('useTenantsContext must be used inside an TenantsContextProvider')
    }

    return context
}