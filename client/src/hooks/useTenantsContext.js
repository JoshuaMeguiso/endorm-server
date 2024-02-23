import { TenantsContext } from "../context/TenantsContext";
import { useContext } from "react";

export const useTenantsContext = () => { 
    const context = useContext(TenantsContext)

    if(!context){
        throw Error('useTenantsContext must be used inside an TenantsContextProvider')
    }

    return context
}