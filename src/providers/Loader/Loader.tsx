import React, { createContext, useState } from "react";
import { IScreenSize } from "types";
import { LoaderWrapper, StyledLoader } from "./Loader.styled";

export const UpdateLoaderState = createContext<{
  showLoader: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}>({ showLoader: () => "", isLoading: false });

type TLoaderProvider = IScreenSize & React.HtmlHTMLAttributes<HTMLDivElement>;

export const LoaderProvider = ({ children, width, height }: TLoaderProvider) => {
  const [isLoading, showLoader] = useState<boolean>(false);

  return (
    <>
      <UpdateLoaderState.Provider value={{ isLoading, showLoader }}>{children}</UpdateLoaderState.Provider>
      {isLoading && (
        <LoaderWrapper height={height} width={width}>
          <StyledLoader>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </StyledLoader>
        </LoaderWrapper>
      )}
    </>
  );
};
