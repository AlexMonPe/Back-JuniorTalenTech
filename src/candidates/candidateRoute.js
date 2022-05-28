const express = require("express");
const router = express.Router();

const { createCandidate } = require("./candidateController.js");


//Create candidate.
router.post('/', createCandidate);

module.exports = router;