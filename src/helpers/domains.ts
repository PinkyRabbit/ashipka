import { MATCH_DOMAIN_REGEX, ONLY_DOMAIN_REGEX } from "../constants";

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
    const domain = url.toLocaleLowerCase().replace(/https?:\/\/(www\.)?/, "");
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