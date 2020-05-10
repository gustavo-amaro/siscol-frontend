import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLogged from './isLogged';

const PrivateRoute = ({component: Component, ...rest}) => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(()=>{
        async function checkIsLogged(){
            setIsLogin(await isLogged());
        }
        checkIsLogged();
    },[])
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;