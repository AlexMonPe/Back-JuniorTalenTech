const supertest = require("supertest");
const { server } = require("../index.js");
const mongoose = require("mongoose");

const app = supertest(server);

afterAll(() => server.close());
afterAll(() => mongoose.disconnect());

describe("update candidate", () => {
  test("update candidate success", async () => {
    const res = await app.patch("/candidates/1").send({
      form: {
        name: "alex",
        surname: "montero",
        email: "alex@geekshubs.com",
        password: "123456",
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
    expect(res.body.user.email).toBe("alex@geekshubs.com");
    expect(res.body.candidate.language_name).toBe("aleman");
    expect(res.body.candidate.work_name).toBe("developer");
  });

  test("update candidate with wrong id", async () => {
    const res = await app.patch("/candidates/99").send({
      form: { name: "alex", email: "alex@alex.com", password: "alex" },
    });
    expect(400);
    expect(res.body.error).toBe("User not found");
  });

  test("update candidate with wrong email", async () => {
    const res = await app.patch("/candidates/1").send({
      form: {
        name: "alex",
        surname: "montero",
        email: "alexalex.com",
        password: "alex",
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
          work_name: "programador",
          functions:
            "programar apps desde 0 utilizando metodologia agile scrum, vsc de IDE",
          start_year: 2015,
          finish_year: 2018,
        },
      ],
      abilities: ["scrum", "php", "react"],
      languages: ["ingles", "aleman"],
    });
    expect(400);
    expect(res.body.error).toBe("Error in email syntax, need @");
  });

  test("update candidate with empty email", async () => {
    const res = await app.patch("/candidates/1").send({
      form: { name: "alex", email: "", password: "alex" },
    });
    expect(res.body.email).toBeUndefined();
    expect(400);
    expect(res.body.error).toBe("Error in email or password, can't be empty");
  });

  test("update candidate with empty password", async () => {
    const res = await app.patch("/candidates/1").send({
      form: { name: "pablo", email: "pablo@pablo.com", password: "" },
    });
    expect(res.body.password).toBeUndefined();
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe("Error in email or password, can't be empty");
  });

  test("update candidate with email duplicated", async () => {
    const res = await app.patch("/candidates/2").send({
      form: { name: "alex", email: "alex@alex.com", password: "alex" },
    });

    expect(400);
    expect(res.body.error).toBe("Email is already in use");
  });

});
