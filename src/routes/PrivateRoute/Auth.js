import React, { useState, useEffect } from 'react'
//import PropTypes from 'prop-types'
//import { checkIsAuthenticated, authSignUp, authLogin, authLogout } from '../../services/auth'
import checkIsAuthenticated from './checkIsAuthenticated';
export const AuthContext = React.createContext({})

export default function Auth({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = () => checkIsAuthenticated()
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false))
        .then(() => setIsLoading(false));

        const entidade_id = localStorage.getItem('entidade_id');
        const token = localStorage.getItem("_token");
        if(entidade_id && token){
           checkAuth();
        }else{
            setIsLoading(false);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}