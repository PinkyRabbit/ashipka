import styled from "styled-components";
import { scrollStyle } from "styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20%;
`;

export const TextareaWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 30vh;
  background: var(--color-bg-secondary);
  color: var(--color-content-secondary);
  resize: none;
  margin-bottom: 30px;

  ${scrollStyle}
`;

export const CopyButton = styled.button`
  position: absolute;
  bottom: 36px;
  left: 0;
  z-index: 1;
  color: var(--color-copy-button-text);
  background: var(--color-copy-button-bg);
  font-size: 1.2em;
  padding: 5px 2px;
  border: none;
`;

export const ResultDescriptionSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ResultDescription = styled.div`
  color: var(--color-content-secondary);
`;
