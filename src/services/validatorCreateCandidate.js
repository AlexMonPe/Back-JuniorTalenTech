const Users = require("../users/userModel.js");
const Candidates = require("../candidate/candidateModel.js");
const isEmail = require("validator/lib/isEmail.js");

const validateCreateCandidate = async (userToCreate, req, res) =>{
    const isEmailDuplicated = await Users.findOne({ email: req.body.email });

    if (!isEmailDuplicated) {
      if (!req.body.email || !req.body.password) {
        res.status(400).json({ error: "Error in email or password, can't be empty" });
      } else if (isEmail(req.body.email)) {
        const userCreated = await Users.create(userToCreate);

        const candidateCreated = await Candidates.create(req.body);
        res.status(200).json({
          candidate: candidateCreated,
          user: userCreated,
        });
      } else {
        res.status(400).json({ error: "Error in email syntax, need @" });
      }
    } else {
      res.status(400).json({ error: "Email already exists" });
    }
}

module.exports = {validateCreateCandidate}