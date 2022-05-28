const express = require("express");
const router = express.Router();

const { createCandidate } = require("./candidateController");


//Create candidate.
router.post('/', createCandidate);

module.exports = router;