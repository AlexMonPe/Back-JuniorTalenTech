const express = require('express');
const connection = require('./DB/connection.js')
const routerCandidates = require('./src/candidate/candidateRoute.js')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

connection().then(()=> console.log('Database is up')).catch('Error connecting DB');

app.get('/api/echo', (req,res) => res.json({echo: 'test get works'}));

app.use('/candidates', routerCandidates);

module.exports.server = app.listen(1919, () => { 
    console.log("Server up at 1919")
})