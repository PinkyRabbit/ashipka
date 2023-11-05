import { Wrapper, StyledButton } from "./Button.styles";

type IButton = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...buttonProps }: IButton) => {
  return (
    <Wrapper>
      <StyledButton role="button" {...buttonProps}>
        {children}
      </StyledButton>
    </Wrapper>
  );
};
