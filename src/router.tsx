import { createBrowserRouter, RouteObject, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }
];

export const router = createBrowserRouter(routes);