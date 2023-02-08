const bcrypt = require("bcrypt");
const Users = require("../model/Users");

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }

  const duplicate = await Users.findOne({ username }).exec();

  if (duplicate) {
    return res.status(409).json({ message: "username already exists" });
  }

  try {
    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //store the new user

    const result = await Users.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ success: `New user, ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
