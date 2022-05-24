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

describe("test to fetch api", () => {
  test("health check is ok", async () => {
    const res = await app.get("/api/echo");
    expect(res.body.echo).toBe("test get works");
  });
});

describe('create candidate', ()=>{
  test("register candidate success", async ()=>{
    const res = await app.post('/candidates/')
    .send({
      name: "alex",
      surname: "montero",
      email: "alex@alex.com",
      password: "123456",
      born_date: "09/06/1990",
      phone_number: 687328331,
      city: "Madrid",
      title: "Full stack developer",
      training: [
        {
          level: "Educacion secundaria obligatoria",
          specialty: "graduado escolar",
          center: "poblenou",
          start_year: 2011,
          finish_year: 2016 }
      ],
      experience: [
        {
          company_name: "geekshubs",
          work_name: "programador",
          functions: "programar apps desde 0 utilizando metodologia agile scrum, vsc de IDE",
          start_year: 2015,
          finish_year: 2018
        }
      ],
      abilities: ["scrum", "php", "react"],
      languages: [{
        language_name: "ingles",
        language_level: "basico"
    }],
    });
    expect(200);
    expect(res.body.user._id).toEqual(expect.anything());
  })

  test("register candidate with wrong email", async ()=>{
    const res = await app.post('/candidates/')
    .send({
      name: "alex",
      surname: "montero",
      email: "alexalex.com",
      password: "alex",
      born_date: "09/06/1990",
      phone_number: 687328331,
      city: "Madrid",
      title: "Full stack developer",
      training: [
        {
          level: "Educacion secundaria obligatoria",
          specialty: "graduado escolar",
          center: "poblenou",
          start_year: 2011,
          finish_year: 2016 }
      ],
      experience: [
        {
          company_name: "geekshubs",
          work_name: "programador",
          functions: "programar apps desde 0 utilizando metodologia agile scrum, vsc de IDE",
          start_year: 2015,
          finish_year: 2018
        }
      ],
      abilities: ["scrum", "php", "react"],
      languages: ["ingles", "aleman"]
    });
    expect(400);
    expect(res.body.error).toBe('Error in email syntax, need @');
  });

  test("register candidate with empty email", async ()=>{
    const res = await app.post('/candidates/')
    .send({
      name: "alex",
      email: "",
      password: "alex"
    });
    expect(res.body.email).toBeUndefined();
    expect(400);
    expect(res.body.error).toBe("Error in email or password, can't be empty");
  });

  test("register candidate with empty password", async ()=>{
    const res = await app.post('/candidates/')
    .send({
      name: "pablo",
      email: "pablo@pablo.com",
      password: ""
    });
    expect(res.body.password).toBeUndefined();
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe("Error in email or password, can't be empty");
  });

  test("register candidate with email duplicated", async ()=>{
    const res = await app.post('/candidates/')
    .send({
      name: "alex",
      email: "alex@alex.com",
      password: "alex"
    });
    
    expect(400);
    expect(res.body.error).toBe('Email already exists');
  });
})