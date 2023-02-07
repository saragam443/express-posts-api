// const User = require("../model/User");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
// const fsPromises = require("fs").promises;
// const path = require("path");
// const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }
  // check for duplicate username in the db

  const foundUser = usersDB.users.find((user) => user.username === username);

  if (!foundUser) return res.sendStatus(401); // unauthorized

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // const roles = Object.values(foundUser.roles);
    //creat JWTs
    // const accessToken = jwt.sign(
    //   {
    //     UserInfo: {
    //       username: foundUser.username,
    //       roles: roles,
    //     },
    //   },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   { expiresIn: "90s" }
    // );
    // const refreshToken = jwt.sign(
    //   { username: foundUser.username },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   { expiresIn: "1d" }
    // );
    // // Saving refresh token with current users
    // foundUser.refreshToken = refreshToken;
    // const result = await foundUser.save();
    // console.log(result);

    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   sameSite: "None",
    //   // secure: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    // });
    // res.json({ accessToken }); // store in memory, front-end

    res.json({ success: `user ${username} is logged in` });
  } else {
    res.sendStatus(401); // unauthorized
  }
};

module.exports = { handleLogin };
