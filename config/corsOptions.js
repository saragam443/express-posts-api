const allowedList = [
  "http://localhost:3000",
  "http://127.0.0.1",
  "http://localhost:5002",
  "https://saragam.com.np"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new error("not allowed by cors"));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
