import * as regex from "./regex";

describe("constants.regex", () => {
  describe("DOMAIN_REGEX", () => {
    it("shell give no error for valid domain names", async () => {
      [
        "http://www.google.com",
        "https://www.google.com",
        "https://google.com",
        "https://www.i.ua",
        "https://i.ua",
        "https://test1.com",
        "https://test2.com",
        "http://bigstuff.cornell.edu",
        "http://server3.dept.cornell.edu",
        "http://project.bigred.cornell.edu",
        "https://www.blend360.com",
        "https://365response.org",
        "https://www.luxury-hotels.com",
        "http://do.xn--mller-kva",
        "https://xn-----llccctufkcfiol4a.xn--p1acf",
        "https://xn--80atjc.xn--80adxhks",

      ].forEach((validDomain) => {
        expect(regex.ONLY_DOMAIN_REGEX.test(validDomain)).toBeTruthy();
      });
    });

    it("shell say false for all tests with invalid domain name", () => {
      [
        "tps://google.com.",
        "https://google.com.",
        "https://google.com/",
        "https://.google.com/",
        "https:///google.com/",
        "https://-google.com/",
        "https://google.com-",
      ].forEach(invalidDomain => {
        expect(regex.ONLY_DOMAIN_REGEX.test(invalidDomain)).toBeFalsy();
      });
    });
  });
});