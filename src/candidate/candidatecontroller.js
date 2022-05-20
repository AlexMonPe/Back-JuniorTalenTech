const Users = require("../users/userModel.js");
const Candidates = require("./candidateModel.js");

const createCandidate = async (req, res) => {
  try {
    const userToCreate = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: "candidate",
    };

    const isEmailDuplicated = await Users.findOne({ email: req.body.email });

    if (!isEmailDuplicated) {
      await Users.create(userToCreate);

      const candidateCreated = await Candidates.create(req.body);

      res.status(200).json(candidateCreated);
    } else {
      res.status(400).json("Email already exists");
    }
  } catch (error) {
    res.status(400).json(error, "Error creating candidate or user");
  }
};

module.exports = { createCandidate };
