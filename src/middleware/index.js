const bcrypt = require("bcrypt");
const User = require("../users/model");
const saltRounds = process.env.SALT_ROUNDS;

const hashPass = async (req, res, next) => {
  try {
    // 1. get a plaintext password
    // 2. hash password
    // const hashedPass = await bcrypt.hash(
    //   req.body.password,
    //   parseInt(saltRounds)
    // );

    //hashed password and replaced plaintext password with hashed in the req.body
    // to pass on to the next func with next()

    if (!req.body.password) {
      const error = new Error("No password");
      res.status(500).json({ errorMessage: error.message, error: error });
    }

    req.body.password = await bcrypt.hash(
      req.body.password,
      parseInt(saltRounds)
    );

    // 3. pass on to next fun to create user with a hashed password
    next();
  } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const comparePass = async (req, res, next) => {
  try {
    // 1. get user for db and append to req

    if (!req.body.password) {
      const error = new Error("No password given");
      res.status(500).json({ errorMessage: error.message, error: error });
    }

    if (!req.body.username) {
      const error = new Error("No username");
      res.status(500).json({ errorMessage: error.message, error: error });
    }

    req.user = await User.findOne({ where: { username: req.body.username } });

    // 2. compare plaintext password in req.body with hashed password in the user returned
    // from db

    const match = await bcrypt.compare(req.body.password, req.user.password);

    // 3. error handling on password match
    if (!match) {
      const error = new Error("Passwords do not match");
      res.status(500).json({ errorMessage: error.message, error: error });
    }
    // 4. next()
    next();
  } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

module.exports = {
  hashPass,
  comparePass,
};
