const supertest = require("supertest");
const { server } = require("../index.js");
const mongoose = require('mongoose');

const app = supertest(server);

// beforeAll(() => console.log("beforeAll tests!!"));
// afterAll(() => console.log("afterall tests!"));
// afterEach(() => console.log("after each one test"));
// beforeEach(() => console.log("before each one test"));

//test.only or .skip for test only one test or skip it.
afterAll(() => server.close());
afterAll(() => mongoose.disconnect());


describe('login ', ()=>{
  test("login success", async ()=>{
    const res = await app.post('/login')
    .send({
      email: "alex@alex.com",
      password: "alex",
    });
    expect(200);
    expect(res.body.token).toEqual(expect.anything())
    // console.log(res, 'response')
  })

  test("login with user not registered", async ()=>{
    const res = await app.post('/login/')
    .send({
        email: "luis@luis.com",
        password: "123456",
      });
    expect(400);
    expect(res.body.error).toBe('User not found');
  });

  test("login with empty email", async ()=>{
    const res = await app.post('/login/')
    .send({
      email: "",
      password: "123456"
    });
    expect(res.body.email).toBeUndefined();
    expect(400);
    expect(res.body.error).toBe("Error in email or password, can't be empty");
  });

  test("login with empty password", async ()=>{
    const res = await app.post('/login/')
    .send({
      name: "alex",
      email: "alex@alex.com",
      password: ""
    });
    expect(res.body.password).toBeUndefined();
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe("Error in email or password, can't be empty");
  });

  test("login with password validation fail", async ()=>{
    const res = await app.post('/login/')
    .send({
      name: "alex",
      email: "alex@alex.com",
      password: "1234"
    });
    
    expect(400);
    expect(res.body.error).toBe('Password should have 6 characters min');
  });
})