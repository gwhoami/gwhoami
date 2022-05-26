import React from "react";
import { Redirect, Route } from "react-router";
import { reactLocalStorage } from "reactjs-localstorage";

const PrivateRoute = ({component: Component, render, ...rest}) => {
    const token = reactLocalStorage.get('userToken','');
    return (
      <Route
        {...rest}
            render={props => {
            if (token) {
                if (render) return render(props);
                else return <Component {...rest} {...props} />;
            } else
                return (
                    <Redirect
                        to={{ pathname: "/", state: { from: props.location } }}
                    />
                );
            }
        }
      />
    );
};

export default PrivateRoute;