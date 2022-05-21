const Users = require("../users/userModel.js");
const Candidates = require("./candidateModel.js");
const isEmail = require("validator/lib/isEmail.js");

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
      if (!req.body.email || !req.body.password) {
        res.status(400).json({ error: "Error in email or password, can't be empty" });
      } else if (isEmail(req.body.email)) {
        await Users.create(userToCreate);

        const candidateCreated = await Candidates.create(req.body);
        res.status(200).json(candidateCreated);
      } else {
        res.status(400).json({ error: "Error in email syntax, need @" });
      }
    } else {
      res.status(400).json({ error: "Email already exists" });
    }
  } catch (error) {
    res.status(400).json(error, "Error creating candidate or user");
  }
};

module.exports = { createCandidate };
