import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import Loading from "../../components/Loading";
import AppLayout from "../../layouts/AppLayout";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoading ? (
          isAuthenticated ? (
            <AppLayout>
              <Component {...props} />
            </AppLayout>
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          <Loading />
        )
      }
    />
  );
};

export default PrivateRoute;
