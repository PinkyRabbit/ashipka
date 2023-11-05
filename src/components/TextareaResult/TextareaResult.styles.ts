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
  background: #181818;
  color: #9abd63;
  resize: none;
  margin-bottom: 30px;

  ${scrollStyle}
`;

export const CopyButton = styled.button`
  position: absolute;
  bottom: 36px;
  left: 0;
  z-index: 1;
  color: #404040;
  background: #66d766;
  font-size: 1.2em;
  padding: 5px 2px;
  border: none;
`;
