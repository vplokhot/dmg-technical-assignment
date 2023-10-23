import { Login } from "auth/Login";
import { Register } from "auth/Register";
import { Dashboard } from "components/Dashboard";
import { Miners } from "components/Miners";
import { useRoutes } from "react-router-dom";
const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/miners",
    element: <Miners />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export const AppRoutes = () => {
  return useRoutes(routes);
};
