const express = require('express');
const connection = require('./DB/connection.js')
const routerCandidates = require('./src/candidates/candidateRoute.js')
const routerUsers = require('./src/users/userRoute.js')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

connection().then(()=> console.log('Database is up')).catch('Error connecting DB');

app.get('/api/echo', (req,res) => res.json({echo: 'test get works'}));

app.use('/candidates', routerCandidates);
app.use('/users', routerUsers);

app.set("port", process.env.PORT || 1515)

module.exports.server = app.listen(app.get("port"), () => { 
    console.log("Server up at " + process.env.SERVER_PORT)
})