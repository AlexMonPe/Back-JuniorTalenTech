# Backend JuniorTalenTech
[![Afterworkfun.gif](https://i.postimg.cc/gJXGr4DZ/logo-Junior-Talentech.gif)](https://postimg.cc/ThJxwgvT)

## Table of contents
  - [API Afterworkfun](#api-afterworkfun)
  - [Tech Stack🛠](#Tech-Stack)
  - [Requisitos 📋](#Descripcion-y-usabilidad)
  - [Relaciones🥨](#Relaciones)
  - [Endpoints⛩](#Endpoints)
  - [Variables de entorno🥑](#Variables-de-entorno)
  - [Bases de datos🔗](#Base-de-datos)
  - [Como instalarlo 🥷](#Instalacion)
  - [Tareas Pendientes 🧙](#Tareas-pendientes)
  - [Autor🤘](#Autor)
  - [Como Ayudar🤝](#Como-ayudar)
  - [Agradecimientos💖](#Agradecimientos)

# Tech Stack 🛠

Se han utilizado las siguientes tecnologías:

<p align="left">     
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
  <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a>
  <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> 
  <a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> 
  <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> 
  <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> 
  <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a>
  
</a> 
</p>

# Descripción y usabilidad 📋

Proyecto final del bootcamp en Geekshubs en el cuál nos dan total libertad para realizar un proyecto full stack para implementar los conociemientos adquiridos en el curso, he optado por realizar un portal de empleo dedicado a perfiles junior para facilitar el proceso de selección y evitar la búsqueda masiva de ofertas que frustran cuándo estás empezando, lo que hace diferente a esta web es que los candidatos no tienen que buscar ofertas, simplemente añadir su información de candidatos, su experiencia y su formación y esperar a que una empresa le encuentre y contacte con el candidato.

He realizado el proyecto con metodología ágil Kanban con `Trello`, añadiendo solo funcionalidades que aporten valor al negocio, por lo que he ido haciendo a la par la funcionalidad del backend junto con la funcionalidad del frontend, he aplicado el diseño de software `TDD` para aprender un poco sobre ello y asimilar bien los beneficios del test-driven-development, se ha utilizado patron MVC para la organización de modelos vistas y controladores.
## Tablas

He creado 3 tablas de `Users`, `Companies`, `Candidates` dónde se añade la información básica del usuario como email y contraseña, en la segunda los datos básicos de una empresa para que pueda registrarse, y los datos del candidato, que principalmente es registro de datos personales y de su formación, experiencias y habilidades/idiomas.

# Endpoints ⛩

Se han definido los siguientes endpoints:

- `/users` -> En este endpoint engloba el login `users/login` para iniciar sesión, `/:id y para modificar los datos del usuario`
Modelo Users:
```
{
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  name: { type: String, required: true },
  title: String,
  description: String,
  ubication: { type: String, required: true },
  website: String,
  cif: { type: String, required: true },
  phone_number: { type: Number, required: true },
  employees: String,
}
```
- `/companies` -> get(`/`) para registrar una empresa(cuando se registra una empresa se cumplimentan los datos del usuario y se crea el usuario y la empresa a la vez), `/:id` para obtener una empresa por el id de usuario y patch(`/:id`) para actualizar los datos de la empresa mediante el id de empresa.
Modelo Companies:
```
{
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  name: { type: String, required: true },
  title: String,
  description: String,
  ubication: { type: String, required: true },
  website: String,
  cif: { type: String, required: true },
  phone_number: { type: Number, required: true },
  employees: String,
}
```
- `/candidates` -> post(`/`) para registrar un candidato (se crea el usuario asociado también), patch(`/:id`) actualizar datos del candidato, get(`/user/id`) para obtener el candidato por el id del usuario asociado, get(`/`) obtiene todos los candidatos y get(`/:id`) para obtener el candidato por su id.
-Modelo Candidate: 
```
{
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  form: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    born_date: { type: String, required: true },
    phone_number: { type: Number, required: true },
    city: { type: String, required: true },
    title: String,
  },
  training: [
    {
      level: { type: String, required: true },
      specialty: { type: String, required: true },
      center: { type: String, required: true },
      start_year: { type: Number, required: true },
      finish_year: { type: Number, required: true },
    },
  ],
  experience: [
    {
      company_name: { type: String, required: true },
      work_name: { type: String, required: true },
      functions: { type: String, text: true, required: true },
      start_year: { type: Number, required: true },
      finish_year: { type: Number, required: true },
    },
  ],
  abilities: [{ type: String, required: true }],
  languages: [
    {
      language_name: String,
      language_level: String,
    },
  ],
}
```



# Relaciones 🥨

Al tratarse de MongoDB (noSQL) he realizado dos referencias a la tabla users en los modelos Candidates y Companies  incluyendo la FK idUser en dichos modelos, y en los controladores he utilizado el método .populate para poder obtener los datos también del usuario.

# Variables de entorno 🥑
Variables de entorno, las pongo públicas con el fin formativo y para que cualquiera pueda utilizarla sin problemas:
```
NODE_ENV=DEV
SERVER_PORT=1919
DB_URI=mongodb+srv://alex:alex@juniortalentech.7ymfc.mongodb.net/juniortalentech?retryWrites=true&w=majority
SECRET_KEY=hashpasswd
PORT=1919
```


# Base de datos 🔗

He utilizado MongoDB junto con robo3T y mongoDBCompass como GUI y Mongoose como ODM para interactuar com MongoDB, finalmente lo he subido al cloud de MongoAtlas.


# Comandos útiles iniciales 👀

`npm run start` -> Para ejecutar el inicio del proyecto
`npm run dev` -> Iniciar el proyecto en modo desarrollo con nodemon


# Instalación 🥷

Para poder consumir el backend es necesario lo siguiente:
- Clonar o forkear el repositorio si deseas, **Alejandro:** _(https://github.com/AlexMonPe/Back-JuniorTalenTech)_.
- Tener instalado Node.js.
- Hacer _npm install_ para cargar las dependencias del package.json
- Atacar al API publicada en https://junior-talent-tech-back.herokuapp.com/ o como localhost si lo prefieres (es necesario cambiarlo en el .env)
- Revisar esta documentación.
- Postman si no quieres utilizar el frontal.
- Conexión a internet

# Tareas pendientes 🧙

  - [ ] Validación de registro por e-mail
  - [ ] Permitir subir archivos .pdf para los CVS y fotos para el perfil.

# Autor 🤟

* const Alejandro = async (Portfolio) => await https://github.com/AlexMonPe ⭕

# Como ayudar 🤝
  
  - Si deseas colaborar con éste proyecto u otro no dudes en contactar con nosotros o solicitar una pull request.
  - Mi correo electrónico _alex_bcn10@hotmail.es_
  - Cualquier aporte se puede recompensar con una cerveza o café, prefiero cerveza.

# Agradecimientos 💖

  * A nuestros profesor@s Ana y pablo por su paciencia.
  * A todos mis compañeros por haber pasado este tiempo junto a ellos y hacer que esta experiencia sea inolvidable..
