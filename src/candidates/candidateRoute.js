const express = require("express");
const router = express.Router();

const { createCandidate, updateCandidate } = require("./candidateController.js");


//Create candidate.
router.post('/', createCandidate);
router.patch('/:id', updateCandidate)

module.exports = router;