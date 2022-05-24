const express = require("express");
const router = express.Router();

const { createCandidate } = require("./candidatecontroller");


//Create candidate.
router.post('/', createCandidate);

module.exports = router;