import { MATCH_DOMAIN_REGEX, ONLY_DOMAIN_REGEX, HTTP_WWW_REGEX } from "../constants";

/**
 * Helper to make unique domains list
 * @param domains - list of domains
 */
export const uniqueDomains = (domains: string[]): string[] => {
  const uniqueStrings = [...new Set(domains)];
  const resultObject: { [key: string]: string } = {};
  uniqueStrings.forEach(url => {
    if (!ONLY_DOMAIN_REGEX.test(url)) {
      return;
    }
    const domain = url.toLocaleLowerCase().replace(HTTP_WWW_REGEX, "");
    const existingString = resultObject[domain];
    if (existingString && existingString.length > url.length) {
      return;
    }
    resultObject[domain] = url;
  });
  return Object.values(resultObject);
};

/**
 * Helper to parse domains from input string
 * @param inputString - input string
 * @param isSkippingDuplicatesRemoving - flag to skip duplicates removing
 */
export const extractDomains = (inputString: string, isSkippingDuplicatesRemoving?: boolean) => {
    const domains = inputString.toLowerCase().match(MATCH_DOMAIN_REGEX);
    if (!domains) {
      return [];
    }
    if (isSkippingDuplicatesRemoving) {
      return domains;
    }
    return uniqueDomains(domains);
};

/**
 * Helper to compare two inputs and select what not been used
 * @param inputString - input string
 */
export const extractNotUsedDomains = (base: string, used: string): string[] => {
    const baseDomains = extractDomains(base);
    const usedDomains = extractDomains(used);
    const usedDomainsNoHttpSet: Set<string> = new Set();
    usedDomains.forEach((domain) => {
      usedDomainsNoHttpSet.add(domain.replace(HTTP_WWW_REGEX, ""));
    });

  return baseDomains.filter(domain => !usedDomainsNoHttpSet.has(domain.replace(HTTP_WWW_REGEX, "")));
};

/**
 * Helper to extract domains intersection
 * @param inputString - input string
 */
export const getBaseIntersection = (input1: string, input2: string): string[] => {
    const input1Domains = extractDomains(input1);
    const input2Domains = extractDomains(input2);
    const arrayToCompare = input1Domains.length < input2Domains.length ? input1Domains : input2Domains;
    const arrayToSet = input1Domains.length < input2Domains.length ? input2Domains : input1Domains;
    const domainsSet: Set<string> = new Set();
    arrayToSet.forEach((domain) => {
      domainsSet.add(domain.replace(HTTP_WWW_REGEX, ""));
    });
  return arrayToCompare.filter(domain => domainsSet.has(domain.replace(HTTP_WWW_REGEX, "")));
};