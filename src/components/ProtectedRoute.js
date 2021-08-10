import React from "react";
import { Redirect } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  if (user !== null) {
    return children;
  } else {
    return <Redirect to="/" />;
  }
}

export default ProtectedRoute;
