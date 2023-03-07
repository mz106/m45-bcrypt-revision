require("dotenv").config();
const express = require("express");
// allows for host to access host port OR dev port 5001
const port = process.env.PORT || 5001;

const User = require("./users/model");

const userRouter = require("./users/routes");

//creates app object from whic we can use methods e.g. .use
const app = express();

app.use(express.json());

const syncTables = () => {
  User.sync();
};

app.use(userRouter);

// standard route to test if API is working
app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is working" });
});

app.listen(port, () => {
  syncTables();
  console.log(`Listening on port ${port}`);
});
