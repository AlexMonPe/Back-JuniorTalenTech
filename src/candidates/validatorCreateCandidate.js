const {Users} = require("../users/userModel.js");
const {Candidates} = require("./candidateModel.js");
const isEmail = require("validator/lib/isEmail.js");

const validateCreateCandidate = async (userToCreate, req, res) => {
  try {
    const isEmailDuplicated = await Users.findOne({ email: req.body.email });

    if (!req.body.email || !req.body.password)
      return res.status(400).json({ error: "Error in email or password, can't be empty" });

    if (!isEmail(req.body.email))
      return res.status(400).json({ error: "Error in email syntax, need @" });

    if (isEmailDuplicated)
      return res.status(400).json({ error: "Email already exists" });

    const candidateCreated = await Candidates.create(req.body);
    const userCreated = await Users.create(userToCreate);

    res.status(200).json({
      candidate: candidateCreated,
      user: userCreated,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error in form creating user or candidate" });
  }
};

module.exports = { validateCreateCandidate };
