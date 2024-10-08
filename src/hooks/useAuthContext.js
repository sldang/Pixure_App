import { AuthContext } from ".contexts/authContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw Error('useAuthContext mus be used inside an AuthContextProvider')
    }

    return context
}