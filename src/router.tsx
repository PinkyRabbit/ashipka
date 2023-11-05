import { createBrowserRouter, RouteObject, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Doprobiv } from "./pages/Doprobiv";
import { Truelinks } from "./pages/Truelinks";

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
    path: "/good-links",
    element: <Truelinks />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export const router = createBrowserRouter(routes);
