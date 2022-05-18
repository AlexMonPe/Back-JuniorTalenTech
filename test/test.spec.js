const supertest = require("supertest");
const { server } = require("../index.js");
const mongoose = require('mongoose')

const app = supertest(server);

// beforeAll(() => console.log("beforeAll tests!!"));
// afterAll(() => console.log("afterall tests!"));
// afterEach(() => console.log("after each one test"));
// beforeEach(() => console.log("before each one test"));

//test.only or .skip for test only one test or skip it.
afterAll(() => server.close());
afterAll(() => mongoose.disconnect());

describe("test to fetch api", () => {
  test("health check is ok", async () => {
    const res = await app.get("/api/echo");
    expect(res.body.echo).toBe("test get works");
  });
});

describe('create candidate', ()=>{
  test("register candidate success", async ()=>{
    const res = await app.post('/candidate/')
    .send({
      name: "alex",
      email: "alex@alex.com",
      password: "alex"
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body._id).anything();
  })
})

describe('create candidate', ()=>{
  test("register candidate with wrong email", async ()=>{
    const res = await app.post('/candidate/')
    .send({
      name: "alex",
      email: "alexalex.com",
      password: "alex"
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Error in email syntax, need @');
  });
})