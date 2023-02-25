import { createBrowserRouter, RouteObject, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Doprobiv } from "./pages/Doprobiv/Doprobiv";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/doprobiv",
    element: <Doprobiv />,
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }
];

export const router = createBrowserRouter(routes);