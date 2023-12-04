import * as domainsHelpers from "./domains";

describe("domains", () => {

  describe("- uniqueDomains", () => {

    it ("shell return the domain", () => {
      const domain = "https://www.test.com";
      const result = domainsHelpers.uniqueDomains([domain]);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(domain);
    });

    it ("shell return empty array if domain is incorrect", () => {
      const result = domainsHelpers.uniqueDomains(["www.kashkdfha.com"]);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(0);
    });

    it ("shell work with multiple lines", () => {
      const domain1 = "https://www.test1.com";
      const domain2 = "https://www.test2.com";
      const result = domainsHelpers.uniqueDomains([domain1, domain2]);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(domain1);
      expect(result[1]).toEqual(domain2);
    });

    it ("shell skip invalid lines lines ", () => {
      const domain1 = "https://www.test1.com";
      const domain2 = "https://www.test2.com";
      const invalid = "unit-test";
      const result = domainsHelpers.uniqueDomains([domain1, invalid, domain2]);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(domain1);
      expect(result[1]).toEqual(domain2);
    });

    it ("shell skip duplicates", () => {
      const domain1 = "https://www.test1.com";
      const domain2 = "https://www.test2.com";
      const domain3 = "https://www.test1.com";
      const result = domainsHelpers.uniqueDomains([domain1, domain2, domain3]);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(domain1);
      expect(result[1]).toEqual(domain2);
    });

    it ("shell ignore secure ans www on comparing", () => {
      const domain1 = "https://www.test1.com";
      const domain2 = "https://www.test2.com";
      const domain3 = "http://test1.com";
      const result = domainsHelpers.uniqueDomains([domain1, domain2, domain3]);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(domain1);
      expect(result[1]).toEqual(domain2);
    });

    it ("shell select longest duplicate version", () => {
      const domain1 = "https://test1.com";
      const domain2 = "https://www.test1.com";
      const domain3 = "http://test1.com";
      const result = domainsHelpers.uniqueDomains([domain1, domain2, domain3]);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(domain2);
    });
  });

  describe("- extractDomains", () => {

    it("shell extract the domain", () => {
      const domain = "https://www.test.com";
      const result = domainsHelpers.extractDomains(domain);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(domain);
    });

    it("shell return empty array if no domains", () => {
      const result = domainsHelpers.extractDomains(" sk ahkasd http www sadfafdf .com");
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(0);
    });

    it("shell extract the domain from line with spaces and garbage", () => {
      const domain = "https://www.test.com";
      const testString = `    askdlhf aa df ${domain} asdkfhakjdsf   12 12 `;
      const result = domainsHelpers.extractDomains(testString);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(domain);
    });

    it("shell extract not secured domain", () => {
      const domain = "http://www.test.com";
      const testString = `    askdlhf aa df ${domain} asdkfhakjdsf   12 12 `;
      const result = domainsHelpers.extractDomains(testString);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(domain);
    });

    it("shell extract domain without www", () => {
      const domain = "http://test.com";
      const testString = `    askdlhf aa df ${domain} asdkfhakjdsf   12 12 `;
      const result = domainsHelpers.extractDomains(testString);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(domain);
    });

    it("shell extract multi level domain without www", () => {
      const domain = "http://test.unit-test.one-more-test.com";
      const testString = `    askdlhf aa df ${domain} asdkfhakjdsf   12 12 `;
      const result = domainsHelpers.extractDomains(testString);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(domain);
    });

    it("shell ignore path", () => {
      const domain = "http://test.unit-test.one-more-test.com";
      const testString = `    askdlhf aa df ${domain}/the-best-test/test?test=2&me=3 asdkfhakjdsf   12 12 `;
      const result = domainsHelpers.extractDomains(testString);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(domain);
    });

    it("shell extract multiple domains", () => {
      const domain1 = "http://test.unit-test.one-more-test.com";
      const domain2 = "http://unit-test.one-more-test2.com";
      const testString = `    askdlhf aa df ${domain1}/the-best-test/test?test=2&me=3  asdkfhakjdsf ${domain2}  12 12 `;
      const result = domainsHelpers.extractDomains(testString);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(domain1);
      expect(result[1]).toEqual(domain2);
    });

    it ("the result shell be unique by default", () => {
      const domain1 = "http://test.unit-test.one-more-test.com";
      const domain2 = "http://unit-test.one-more-test2.com";
      const testString = `    askdlhf aa df ${domain1}/the-best-test/test?test=2&me=3  asdkfhakjdsf ${domain2} ${domain1}  12 12 `;
      const result = domainsHelpers.extractDomains(testString);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(domain1);
      expect(result[1]).toEqual(domain2);
    });
  });

  describe("- extractNoUsedDomains", () => {
    it ("shell to extract domains from both inputs and leave only unique from input 1", () => {
      const domain1 = "http://test.unit-test.one-more-test.com";
      const domain2 = "http://unit-test.one-more-test2.com";
      const domain3 = "http://www.test3.com";
      const domain4 = "http://www.test4.com";
      const domain5 = "http://www.test5.com";
      const input1 = ` sagf ${domain1} http www ${domain2} ${domain3} ${domain4} ${domain5} ${domain1} `;
      const input2 = ` sagf ${domain1} http www ${domain3} ${domain5} ${domain1} `;
      const result = domainsHelpers.extractNotUsedDomains(input1, input2);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual(domain2);
      expect(result[1]).toEqual(domain4);
    });

  });

  describe("- getBaseIntersection", () => {
    it ("shell get intersected domains only", () => {
      const domain1 = "http://test.unit-test.one-more-test.com";
      const domain2 = "http://unit-test.one-more-test2.com";
      const domain3 = "http://www.test3.com";
      const domain4 = "http://www.test4.com";
      const domain5 = "http://www.test5.com";
      const input1 = ` sagf ${domain1} http www ${domain2} ${domain3} ${domain4} ${domain5} ${domain1} `;
      const input2 = ` sagf ${domain1} http www ${domain3} ${domain5} ${domain1} `;
      const result = domainsHelpers.getBaseIntersection(input1, input2);
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(3);
      expect(result[0]).toEqual(domain1);
      expect(result[1]).toEqual(domain3);
      expect(result[2]).toEqual(domain5);
    });
  });
});