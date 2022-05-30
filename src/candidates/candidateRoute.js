const express = require("express");
const router = express.Router();

const { createCandidate, updateCandidate } = require("./candidateController.js");


//Create candidate.
router.post('/', createCandidate);
router.post('/', updateCandidate)

module.exports = router;