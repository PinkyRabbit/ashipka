import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { Wrapper, TextareaStyled, Label } from "./Textarea.styles";

interface ITextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  fieldName: string;
  label: string;
  formHook: UseFormReturn<any, any>;
}

export const Textarea = ({ children, fieldName, label, className, formHook }: ITextarea) => {
  const textareaClass = useMemo(() => {
    const c: string[] = ["form-control"];
    if (className) {
      c.push(className);
    }
    return c.join(" ");
  }, [className]);

  const clearErrors = () => {
    if (formHook.formState.errors[fieldName]) {
      formHook.clearErrors(fieldName);
    }
  };

  return (
    <Wrapper>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <TextareaStyled
        id={fieldName}
        className={textareaClass}
        onFocus={clearErrors}
        hasErrors={!!formHook.formState.errors[fieldName]}
        {...formHook.register(fieldName)}
      >
        {children}
      </TextareaStyled>
    </Wrapper>
  );
};
