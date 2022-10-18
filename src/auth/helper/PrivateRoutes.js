import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { IsAuthenticated } from "./index";

const PrivateRoutes = ({ children }) => {
  if (!IsAuthenticated()) {
    return <Navigate to="/signin" replace />;
  } else {
    return children ? children : <Outlet />;
  }
};

export default PrivateRoutes;
