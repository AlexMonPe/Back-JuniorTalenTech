const supertest = require("supertest");
const { server } = require("../index.js");
const mongoose = require("mongoose");

const app = supertest(server);

afterAll(() => server.close());
afterAll(() => mongoose.disconnect());

describe("update company", () => {
  test("update company success", async () => {
    const res = await app.patch("/companies/6297b9f9faf23caa3beb757c").send({
      name: "Kontesa",
      title: "Formación y seleccion IT",
      description: "Descripción empresa",
      ubication: "Madrid",
      website: "www.kontesafilms.com",
      phone_number: 919871235,
      cif: "B687896487",
      employees: "500-1000 empleados",
      email: "geekshubs@geekshubs.com",
      password: "geekshubs",
    });
    expect(200);
    expect(res.body).toBe("Se han guardado los cambios");
  });

  test("update company with wrong id", async () => {
    const res = await app.patch("/companies/99").send({
        name: "Kontesa",
        title: "Formación y seleccion IT",
        description: "Descripción empresa",
        ubication: "Madrid",
        website: "www.kontesafilms.com",
        phone_number: 919871235,
        cif: "B687896487",
        employees: "500-1000 empleados",
        email: "geekshubs@geekshubs.com",
        password: "geekshubs",
      });
    expect(400);
    expect(res.body.error).toBe("Empresa no encontrado");
  });
});
