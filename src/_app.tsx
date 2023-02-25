import { RouterProvider } from "react-router-dom";
import styled from "styled-components";
import { router } from "./router";
import backgroundImage from "./assets/bg.jpg";

export const Wrapper = styled.div`
  background: url(${backgroundImage}) no-repeat center bottom;
  height: 100vh;
  padding: 10px 20px 450px 20px;
`;

export const App = () => {
  return (
    <Wrapper className="App">
      <RouterProvider router={router} />
    </Wrapper>
  );
};
