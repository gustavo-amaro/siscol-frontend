import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Auth';
import Loading from '../../components/Loading';

const PrivateRoute = ({component: Component, ...rest}) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
    return (
        <Route {...rest} render={props => (
            !isLoading ?
            (
                isAuthenticated
                ?
                    <Component {...props} />
                : <Redirect to="/login" />
            )
            : <Loading />
        )} />
    );
};

export default PrivateRoute;