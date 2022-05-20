const express = require("express");

const app = express();

app.use(express.json());

app.get('/api/echo', (req,res) => res.json({echo: 'test get works'}))

module.exports.server = app.listen(1919, () => { 
    console.log("Server up at 1919")
})