const supertest = require("supertest");
const { server } = require("../index.js");
const mongoose = require("mongoose");

const app = supertest(server);

// beforeAll(() => console.log("beforeAll tests!!"));
// afterAll(() => console.log("afterall tests!"));
// afterEach(() => console.log("after each one test"));
// beforeEach(() => console.log("before each one test"));

//test.only or .skip for test only one test or skip it.
afterAll(() => server.close());
afterAll(() => mongoose.disconnect());

describe("login ", () => {
  test("login success", async () => {
    const res = await app.post("/users/login/").send({
      email: "alex@alex.com",
      password: "123456",
    });
    expect(200);
    expect(res.body.token).toEqual(expect.anything());
  });

  test("login with user not registered", async () => {
    const res = await app.post("/users/login/").send({
      email: "luis@luis.com",
      password: "123456",
    });
    expect(400);
    expect(res.body.error).toBe("Usuario o contraseña incorrecta");
  });

  test("login with empty email", async () => {
    const res = await app.post("/users/login/").send({
      email: "",
      password: "123456",
    });
    expect(res.body.email).toBeUndefined();
    expect(404);
    expect(res.body.error).toBe("Usuario o contraseña incorrecta");
  });

  test("login with empty password", async () => {
    const res = await app.post("/users/login/").send({
      name: "alex",
      email: "alex@alex.com",
      password: "",
    });
    expect(res.body.password).toBeUndefined();
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe("Usuario o contraseña incorrecta");
  });
});
