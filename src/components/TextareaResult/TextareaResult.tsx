import React from "react";
import { Button } from "../Button/Button";
import { Wrapper, TextareaWrapper, Textarea, CopyButton, ResultDescriptionSection, ResultDescription } from "./TextareaResult.styles";

interface ITextareaResult extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  lines: number;
  reset: () => void;
}

export const TextareaResult = ({ children, lines, reset }: ITextareaResult) => (
  <Wrapper>
    <TextareaWrapper>
      <CopyButton>Copy</CopyButton>
      <Textarea disabled={true}>{children}</Textarea>
    </TextareaWrapper>

    <ResultDescriptionSection>
      <ResultDescription>
        {lines} lines length
      </ResultDescription>

      <Button type="reset" onClick={reset}>
        Отправить снова
      </Button>
    </ResultDescriptionSection>
  </Wrapper>
);
