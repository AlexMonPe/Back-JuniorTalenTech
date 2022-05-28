const supertest = require("supertest");
const { server } = require("../index.js");
const mongoose = require("mongoose");

const app = supertest(server);

afterAll(() => server.close());
afterAll(() => mongoose.disconnect());

describe("create company", () => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  test("register company success", async () => {
    const res = await app.post("/companies/").send({
      name: "geekshubs",
      title: "Formación y seleccion IT",
      description: "Descripción empresa",
      ubication: "Madrid",
      website: "www.geekshubs.com",
      phone_number: 919871235,
      employees: "500-1000 empleados",
      email: "geekshubs@geekshubs.com",
      password: "geekshubs",
    });
    expect(200);
    expect(res.email).toMatch(emailPattern);
    expect(res.body.user._id).toEqual(expect.anything());
  });

  test("register candidate with wrong email", async () => {
    const res = await app.post("/companies/").send({
      name: "geekshubs",
      title: "Formación y seleccion IT",
      description: "Descripción empresa",
      ubication: "Madrid",
      website: "www.geekshubs.com",
      phone_number: 919871235,
      employees: "500-1000 empleados",
      email: "geekshubsgeekshubs.com",
      password: "geekshubs",
    });
    expect(400);
    expect(res.body.error).toBe("Email not valid");
  });

  test("register company with empty email", async () => {
    const res = await app.post("/companies/").send({
      name: "geekshubs",
      title: "Formación y seleccion IT",
      description: "Descripción empresa",
      ubication: "Madrid",
      website: "www.geekshubs.com",
      phone_number: 919871235,
      employees: "500-1000 empleados",
      email: "",
      password: "geekshubs",
    });
    expect(res.body.email).toBeUndefined();
    expect(400);
    expect(res.body.error).toBe("Error in email or password, can't be empty");
  });

  test("register company with empty password", async () => {
    const res = await app.post("/companies/").send({
      name: "geekshubs",
      title: "Formación y seleccion IT",
      description: "Descripción empresa",
      ubication: "Madrid",
      website: "www.geekshubs.com",
      phone_number: 919871235,
      employees: "500-1000 empleados",
      email: "geekshubs@geekshubs.com",
      password: "",
    });
    expect(res.body.password).toBeUndefined();
    expect(400);
    expect(res.body.error).toBe("Error in email or password, can't be empty");
  });

  test("register company with empty name", async () => {
    const res = await app.post("/companies/").send({
      name: "",
      title: "Formación y seleccion IT",
      description: "Descripción empresa",
      ubication: "Madrid",
      website: "www.geekshubs.com",
      phone_number: 919871235,
      employees: "500-1000 empleados",
      email: "",
      password: "geekshubs",
    });
    expect(res.body.name).toBeUndefined();
    expect(400);
    expect(res.body.error).toBe("Error company name, can't be empty");
  });

  test("register company with email duplicated", async () => {
    const res = await app.post("/companies/").send({
      name: "geekshubs",
      title: "Formación y seleccion IT",
      description: "Descripción empresa",
      ubication: "Madrid",
      website: "www.geekshubs.com",
      phone_number: 919871235,
      employees: "500-1000 empleados",
      email: "geekshubs@geekshubs.com",
      password: "geekshubs",
    });

    expect(400);
    expect(res.body.error).toBe("Email already exists");
  });
});
