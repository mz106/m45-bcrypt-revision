const User = require("./model");

const registerUser = async (req, res) => {
  try {
    // 1. create user and add to db
    const user = await User.create(req.body);
    console.log(user);
    // 2. make sure password is taken out from the response
    // 3. send response

    res.status(201).json({
      message: "success",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const login = async (req, res) => {
  try {
    // 1. send response

    res
      .status(202)
      .json({
        message: "success",
        user: { username: req.user.username, email: req.user.email },
      });
  } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

module.exports = { registerUser, login };
