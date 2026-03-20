import React, { type ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "../app/store";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  return user ? <>{children}</> : <Navigate to="/login" state={{from:location}} replace/>;
};

export default ProtectedRoute;