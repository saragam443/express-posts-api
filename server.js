// require("express-async-errors");
const express = require("express");
const app = express();
const path = require("path");
// const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials")
const PORT = process.env.PORT || 3008;

// app.use(logger);
app.use(credentials)
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/api/posts", require("./routes/postsRoute"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("text").send("404 not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log("server is running on port: ", PORT));

