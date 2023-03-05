import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 30px;
`;

export const TextareaWrapper = ({ children }: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return <Wrapper>{children}</Wrapper>;
};
