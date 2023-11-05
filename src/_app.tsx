import { useLayoutEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import styled from "styled-components";
import { LoaderProvider } from "./providers/Loader/Loader";
import { IScreenSize } from "./types";
import { router } from "./router";
import backgroundImage from "./assets/bg.jpg";

export const Wrapper = styled.div<{ height: number }>`
  min-height: ${({ height }) => (height > 800 ? height - 470 + "px" : "100vh")};
  background: url(${backgroundImage}) no-repeat center bottom;
  padding: 20px 30px 450px 40px;
`;

export const App = () => {
  const [size, setSize] = useState<IScreenSize>({ width: 0, height: 0 });

  const updateSize = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useLayoutEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Wrapper height={size.height}>
      <LoaderProvider width={size.width} height={size.height}>
        <RouterProvider router={router} />
      </LoaderProvider>
    </Wrapper>
  );
};
