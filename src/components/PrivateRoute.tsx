import * as React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';
import {useAuth} from "../hooks/useAuth";

const REDIRECT_PATH = '/login'

interface PrivateRouteProps extends RouteProps {
    component: any;
}

export const PrivateRoute:React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const {isAuth} = useAuth()

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                isAuth ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect
                        to={{
                            pathname: REDIRECT_PATH,
                            state: { from: routeProps.location }
                        }}
                    />
                )
            }
        />
    );
};