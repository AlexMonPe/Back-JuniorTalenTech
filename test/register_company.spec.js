const supertest = require("supertest");
const { server } = require("../index.js");
const mongoose = require("mongoose");

const app = supertest(server);

afterAll(() => server.close());
afterAll(() => mongoose.disconnect());

describe("create company", () => {
    test("register company success", async () => {
      const res = await app.post("/companies/").send({
          name: "geekshubs",
          title: "Formación y seleccion IT",
          description: "Descripción empresa",
          ubication: "Madrid",
          website: "www.geekshubs.com",
          phone_number: 919871235,
          employees: "500-1000 empleados",
      })
      expect(200);
      expect(res.body.user._id).toEqual(expect.anything());
    });
  });
  