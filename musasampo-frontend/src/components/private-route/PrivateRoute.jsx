import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { SignInServices } from '../../services/sign-in-service';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentToken = SignInServices.currentTokenValue;
        if (!currentToken) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)