const express = require('express');
const connection = require('./DB/connection.js')
const routerCandidates = require('./src/candidate/candidateRoute.js')

const app = express();

app.use(express.json());

connection().then(()=> console.log('Database is up')).catch('Error connecting DB');

app.get('/api/echo', (req,res) => res.json({echo: 'test get works'}));

app.use('/candidates', routerCandidates);

module.exports.server = app.listen(1919, () => { 
    console.log("Server up at 1919")
})