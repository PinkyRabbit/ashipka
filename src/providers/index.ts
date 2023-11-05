import { useContext } from "react";
import { UpdateLoaderState } from "./Loader/Loader";

export const useLoader = () => {
  return useContext(UpdateLoaderState);
};
