import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoader } from "providers";
import { Button, PageDescription, Textarea, TextareaWrapper, TextareaResult } from "components";
import { extractNotUsedDomains } from "../helpers/domains";

type IData = {
  baseList: string;
  report: string;
};

const schema = yup
  .object({
    baseList: yup
      .string()
      .matches(/https?:\/\/(www\.)?([a-z0-9-]+\.)+[a-z0-9-]+/gm)
      .required(),
    report: yup
      .string()
      .matches(/https?:\/\/(www\.)?([a-z0-9-]+\.)+[a-z0-9-]+/gm)
      .required(),
  })
  .required();

export const Doprobiv = () => {
  const DESCRIPTION =
    "Бывает такое что в прогоне пробило меньше чем должно. Или это почта или прокси или база или программа - не важно. В общем, нужно повторно пробить. Для того, чтобы отобрать не пробитые сайты, вставляем базу в первый столбец. Важно чтобы ссылки начинались в http или https. Во второй столбец вставляем отчёт";

  const [result, setResult] = useState<string[] | null>(null);

  const { isLoading, showLoader } = useLoader();

  const resolver = yupResolver(schema);
  const formHook = useForm<IData>({ resolver });

  useEffect(() => {
    const { report, baseList } = formHook.getValues();
    if (!isLoading || !report || !baseList) {
      return;
    }
    showLoader(false);
    const notUsedDomains = extractNotUsedDomains(baseList, report);
    setResult(notUsedDomains);
  }, [isLoading]);

  const onSubmit = () => {
    !isLoading && showLoader(true);
  };

  const reset = () => {
    setResult(null);
    formHook.reset();
  };

  return (
    <>
      <PageDescription>{DESCRIPTION}</PageDescription>
      {result ? (
        <TextareaResult reset={reset} lines={result.length}>{result?.join("\n")}</TextareaResult>
      ) : (
        <form onSubmit={formHook.handleSubmit(onSubmit)}>
          <TextareaWrapper>
            <Textarea fieldName="baseList" label="База" formHook={formHook} />
            <Textarea fieldName="report" label="Отчёт" formHook={formHook} />
          </TextareaWrapper>
          <Button type="submit">Запустить сравнение</Button>
        </form>
      )}
    </>
  );
};
