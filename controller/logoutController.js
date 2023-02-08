const Users = require("../model/Users");


const handleLogout = async (req, res) => {
  //on the client side, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content
  const refreshToken = cookies.jwt;

  // is refreshTOken in db?
  const foundUser = await Users.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // delete refresh token in db

  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); 
  
  res.sendStatus(204);
};

module.exports = { handleLogout };
