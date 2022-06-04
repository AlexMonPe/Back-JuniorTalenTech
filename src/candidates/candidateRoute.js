const express = require("express");
const router = express.Router();

const { createCandidate, updateCandidate, getCandidateByUserId, getAllCandidates, getCandidateById } = require("./candidateController.js");


//Create candidate.
router.post('/', createCandidate);
router.patch('/:id', updateCandidate)
router.get('/user/:id', getCandidateByUserId)
router.get('/', getAllCandidates)
router.get('/:id', getCandidateById)




module.exports = router;