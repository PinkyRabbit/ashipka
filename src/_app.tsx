import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./styles.css";

export const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
