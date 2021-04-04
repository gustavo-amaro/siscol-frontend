import React from "react";
import { Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <AppLayout>
          <Component {...props} />
        </AppLayout>
      )}
    />
  );
};

export default PrivateRoute;
