const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  console.log(origin);
  console.log(allowedOrigins);
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
    console.log("hello");
  }
  next();
};

module.exports = credentials;
