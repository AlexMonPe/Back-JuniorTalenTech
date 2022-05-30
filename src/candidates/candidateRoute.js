const express = require("express");
const router = express.Router();

const { createCandidate, updateCandidate, getCandidateByUserId } = require("./candidateController.js");


//Create candidate.
router.post('/', createCandidate);
router.patch('/:id', updateCandidate)
router.get('/:id', getCandidateByUserId)


module.exports = router;