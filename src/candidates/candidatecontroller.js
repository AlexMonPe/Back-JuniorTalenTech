const { validateCreateCandidate } = require("../services/validatorCreateCandidate.js")
const {hasher} = require("../services/bcrypt.js")

const createCandidate = async (req, res) => {
  try {
    const userToCreate = {
      name: req.body.name,
      email: req.body.email,
      password: await hasher(req.body.password),
      role: "candidate",
    };

    validateCreateCandidate(userToCreate, req, res);
    
  } catch (error) {
    res.status(400).json(error, "Error creating candidate or user");
  }
};

module.exports = { createCandidate };