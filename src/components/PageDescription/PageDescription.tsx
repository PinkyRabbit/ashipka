import styled from "styled-components";

const ContentWrapper = styled.p`
  padding-bottom: 20px;
`;

interface IPageDescription {
  children: React.ReactNode;
}

export const PageDescription = ({ children }: IPageDescription) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};
