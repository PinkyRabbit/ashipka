export const MATCH_DOMAIN_REGEX = /https?:\/\/(www\.)?[a-z0-9][a-z0-9-]*(\.[a-z0-9-]+)*\.[a-z][a-z0-9-]*[a-z]/gim;
export const ONLY_DOMAIN_REGEX = /^https?:\/\/(www\.)?[a-z0-9][a-z0-9-]*(\.[a-z0-9-]+)*\.[a-z][a-z0-9-]*[a-z]$/im;  // don't use "g" flag with test
export const HTTP_WWW_REGEX = /https?:\/\/(www\.)?/;