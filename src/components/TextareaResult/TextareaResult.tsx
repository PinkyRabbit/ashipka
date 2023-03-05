import React from "react";
import { Button } from "../Button/Button";
import { Wrapper, TextareaWrapper, Textarea, CopyButton } from "./TextareaResult.styles";

interface ITextareaResult extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  reset: () => void;
}

export const TextareaResult = ({ children, reset }: ITextareaResult) => {
  // onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}

  return (
    <Wrapper>
      <TextareaWrapper>
        <CopyButton>Copy</CopyButton>
        <Textarea disabled={true}>{children}</Textarea>
      </TextareaWrapper>

      <Button type="reset" onClick={reset}>
        Отправить снова
      </Button>
    </Wrapper>
  );
};
