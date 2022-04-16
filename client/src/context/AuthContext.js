import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null ,
    isFetching: false,
    error: false,
    isLoggedIn: JSON.parse(localStorage.getItem("loginState")) || false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("loginState", JSON.stringify(state.isLoggedIn));
    },[state.user, state.isLoggedIn])

    return (
        <AuthContext.Provider value={{user: state.user , isFetching: state.isFetching, error: state.error, isLoggedIn: state.isLoggedIn, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}