import styled from "styled-components";
import { scrollStyle } from "styles";

export const Wrapper = styled.div`
  flex: 1;
  padding-bottom: 20px;
`;

export const TextareaStyled = styled.textarea<{ hasErrors?: boolean }>`
  width: 100%;
  height: 30vh !important;
  color: #ccd5a7 !important;
  background: #181818;
  resize: none;
  border-color: ${({ hasErrors }) => (hasErrors ? "#ab4444" : "")};

  ${scrollStyle}
`;

export const Label = styled.label``;

export const HintContent = styled.p`
  color: var(--color-pink);

  & span {
    color: var(--color-blue);
  }
`;
