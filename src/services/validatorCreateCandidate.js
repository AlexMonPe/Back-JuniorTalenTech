const Users = require("../users/userModel.js");
const Candidates = require("../candidates/candidateModel.js");
const isEmail = require("validator/lib/isEmail.js");

const validateCreateCandidate = async (userToCreate, req, res) =>{
  try {
    const isEmailDuplicated = await Users.findOne({ email: req.body.email });

    if (!isEmailDuplicated) {
      if (!req.body.email || !req.body.password) {
        res.status(400).json({ error: "Error in email or password, can't be empty" });
      } else if (isEmail(req.body.email)) {
        const candidateCreated = await Candidates.create(req.body);
        const userCreated = await Users.create(userToCreate);
        
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
  } catch (error) {
    res.status(400).json({error: 'Error creating user or candidate, duplicated phone or email'})
  }

    
}

module.exports = {validateCreateCandidate}