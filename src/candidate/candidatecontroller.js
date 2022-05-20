const Candidates = require("./candidateModel.js");

const createCandidate = async (req,res) => {
  try {
    const candidateCreated = await Candidates.create(req.body);
    res.status(200).json(candidateCreated);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { createCandidate };
