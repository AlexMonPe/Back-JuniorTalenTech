const supertest = require("supertest");
const { server } = require("../index.js");
const mongoose = require("mongoose");

const app = supertest(server);

afterAll(() => server.close());
afterAll(() => mongoose.disconnect());

describe("get candidates", () => {
  test("get candidates success", async () => {
    const res = await app.get("/candidates/");
    expect(200);
    console.log(res.body)
    expect(res.body[0]).toEqual(expect.anything());
  });
});
