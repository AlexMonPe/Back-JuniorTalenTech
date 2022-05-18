import express from "express";

const app = express();

app.use(express.json());

app.get('/api/echo', (req,res) => res.json({echo: 'test get works'}))

