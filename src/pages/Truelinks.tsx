import { useLayoutEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoader } from "providers";
import { Button, PageDescription, Textarea, TextareaWrapper, TextareaResult } from "components";

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

export const Truelinks = () => {
  const DESCRIPTION = useMemo(() => {
    return [
      "Бывает такое что прогон пошёл по плохой базе.",
      "Для того, чтобы отобрать хорошие сайты, вставляем базу с",
      "хорошими сайтами в первый столбец. Важно чтобы ссылки",
      "в нём начинались в http или https. Во второй столбец вставляем отчёт",
    ].join(" ");
  }, []);

  const [result, setResult] = useState<string[] | null>(null);

  const { isLoading, showLoader } = useLoader();

  const resolver = yupResolver(schema);
  const formHook = useForm<IData>({ resolver });

  useLayoutEffect(() => {
    const { report, baseList } = formHook.getValues();
    if (!isLoading || !report || !baseList) {
      return;
    }
    showLoader(false);

    const domainRegex = /https?:\/\/(www\.)?([a-z0-9-]+\.)+[a-z0-9-]+/gm;

    const baseDomainsList = baseList.toLowerCase().match(domainRegex);
    if (!Array.isArray(baseDomainsList)) {
      formHook.setError("baseList", { type: "required" });
      return;
    }
    const baseDomainsSet = new Set(baseDomainsList);

    const goodLinks = report
      .toLowerCase()
      .split("\n")
      .filter(line => {
        const domainInLine = line.match(domainRegex);
        if (!domainInLine) {
          return false;
        }
        return baseDomainsSet.has(domainInLine[0]);
      });

    setResult(goodLinks);
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
        <TextareaResult reset={reset}>{result?.join("\n")}</TextareaResult>
      ) : (
        <form onSubmit={formHook.handleSubmit(onSubmit)}>
          <TextareaWrapper>
            <Textarea fieldName="baseList" label="База c хорошими сайтами" formHook={formHook} />
            <Textarea fieldName="report" label="Отчёт" formHook={formHook} />
          </TextareaWrapper>
          <Button type="submit">Запустить сравнение</Button>
        </form>
      )}
    </>
  );
};
