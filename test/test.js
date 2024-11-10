const request = require("supertest");
const app = require("../index"); // Adjust the path according to your file structure

describe("GET /", function () {
  it("respond with Hello World!", async function () {
    const chai = await import("chai");
    const expect = chai.expect;

    return request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.text).to.equal("Hello World!");
      });
  });
});
