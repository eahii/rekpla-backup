import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { auth } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props =>
                auth.token ? <Component {...props} /> : <Navigate to="/login" />
            }
        />
    );
};

export default PrivateRoute;