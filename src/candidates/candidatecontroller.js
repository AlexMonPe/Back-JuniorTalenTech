const { hasher } = require("../services/bcrypt.js");
const { Users } = require("../users/userModel.js");
const { Candidates } = require("./candidateModel.js");
const isEmail = require("validator/lib/isEmail.js");

const createCandidate = async (req, res) => {
  try {
    const userToCreate = {
      email: req.body.form.email,
      password: await hasher(req.body.form.password),
      role: "candidate",
    };

    const isEmailDuplicated = await Users.findOne({
      email: req.body.form.email,
    });

    if (!req.body.form.email || !req.body.form.password)
      return res
        .status(400)
        .json({ error: "Error in email or password, can't be empty" });

    if (!isEmail(req.body.form.email))
      return res.status(400).json({ error: "Error in email syntax, need @" });

    if (isEmailDuplicated)
      return res.status(400).json({ error: "Email already exists" });

    const userCreated = await Users.create(userToCreate);

    if (!userCreated)
      return res.status(400).json({ error: "Error creating user" });

    const candidateCreated = await Candidates.create(req.body);

    res.status(200).json({
      candidate: candidateCreated,
      user: userCreated,
    });
  } catch (error) {
    res.status(400).json(error, "Error creating candidate or user");
  }
};

module.exports = { createCandidate };
