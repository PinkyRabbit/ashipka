import styled from "styled-components";

interface ILoaderWrapper {
  height?: number;
  width?: number;
}

export const LoaderWrapper = styled.div<ILoaderWrapper>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => (height ? height + "px" : "100vh")};
  width: ${({ width }) => (width ? width + "px" : "100vw")};
`;

export const StyledLoader = styled.div`
  width: 44px;
  height: 44px;
  border: 6px solid white;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
