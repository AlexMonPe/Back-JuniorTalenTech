const supertest = require("supertest");
const { server } = require("../index.js");
const mongoose = require("mongoose");

const app = supertest(server);

afterAll(() => server.close());
afterAll(() => mongoose.disconnect());

describe("update candidate", () => {
  test("update candidate success", async () => {
    const res = await app.patch("/candidates/6294baded847c1dcf6360361").send({
      form: {
        name: "alex",
        surname: "montero",
        born_date: "09/06/1990",
        phone_number: 687328331,
        city: "Madrid",
        title: "Full stack developer",
      },
      training: [
        {
          level: "Educacion secundaria obligatoria",
          specialty: "graduado escolar",
          center: "poblenou",
          start_year: 2011,
          finish_year: 2016,
        },
      ],
      experience: [
        {
          company_name: "geekshubs",
          work_name: "developer",
          functions:
            "programar apps desde 0 utilizando metodologia agile scrum, vsc de IDE",
          start_year: 2015,
          finish_year: 2018,
        },
      ],
      abilities: ["scrum", "php", "react"],
      languages: [
        {
          language_name: "aleman",
          language_level: "basico",
        },
      ],
    });
    expect(200);
    expect(res.body).toBe("Se han guardado los cambios");
  });

  test("update user success", async () => {
    const res = await app.patch("/users/6294baded847c1dcf636035f").send({
      name: "alex",
      email: "alex@geekshubs.com",
      password: "123456",
    });
    expect(200);
    expect(res.body).toBe("Se han guardado los cambios");
  });

  test("update candidate with wrong id", async () => {
    const res = await app.patch("/candidates/99").send({
      name: "alex",
      surname: "perez",
      born_date: "09/06/1990",
      phone_number: 687328331,
      city: "Madrid",
      title: "Full stack developer",
    });
    expect(400);
    expect(res.body.error).toBe("Usuario no encontrado");
  });

  test("update user with wrong id", async () => {
    const res = await app.patch("/candidates/99").send({
      name: "alex",
      email: "alex@alex.com",
      password: "1234567",
    });
    expect(400);
    expect(res.body.error).toBe("Usuario no encontrado");
  });

  test("update user with wrong email", async () => {
    const res = await app.patch("/users/6294baded847c1dcf636035f").send({
      name: "alex",
      email: "alexgeekshubs.com",
      password: "123456",
    });
    expect(400);
    expect(res.body.error).toBe("Email no valido");
  });
});
