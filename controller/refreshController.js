const Users = require("../model/Users");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  console.log(cookies.jwt);

  const refreshToken = cookies.jwt;

  const foundUser = await Users.foundUser({
    refreshToken,
  }).exec();

  if (!foundUser) return res.sendStatus(403); // forbidden

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);

    //creat JWTs
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2m" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
