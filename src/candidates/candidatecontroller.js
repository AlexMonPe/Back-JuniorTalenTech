const { validateCreateCandidate } = require("./validatorCreateCandidate.js");
const { hasher } = require("../services/bcrypt.js");

const createCandidate = async (req, res) => {
  try {
    const userToCreate = {
      name: req.body.form.name,
      email: req.body.form.email,
      password: await hasher(req.body.form.password),
      role: "candidate",
    };

    validateCreateCandidate(userToCreate, req, res);
  } catch (error) {
    res.status(400).json(error, "Error creating candidate or user");
  }
};

module.exports = { createCandidate };
