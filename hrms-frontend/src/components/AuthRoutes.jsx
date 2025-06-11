import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const userInfo = true;
  const isAuthRoute = !!userInfo;
  return isAuthRoute ? <Navigate to="/dashboard/home" /> : children;
};

export const PrivateRoute = ({ children }) => {
  const userInfo = true;
  const isAuthRoute = !!userInfo;
  return isAuthRoute ? children : <Navigate to="/signin" />;
};
