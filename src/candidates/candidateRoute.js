const express = require("express");
const router = express.Router();

const { createCandidate, updateCandidate, getCandidateByUserId, getAllCandidates } = require("./candidateController.js");


//Create candidate.
router.post('/', createCandidate);
router.patch('/:id', updateCandidate)
router.get('/:id', getCandidateByUserId)
router.get('/', getAllCandidates)



module.exports = router;