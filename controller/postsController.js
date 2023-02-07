const Posts = require("../model/Posts");
const Users = require("../model/Users");
// const asyncHandler = require("express-async-handler"); // used express-async-errors instead

const getAllPosts = async (req, res) => {
  const posts = await Posts.find().lean();
  
  if (!posts?.length) {
    return res.status(400).json({ message: "posts not found" });
  }

  const postsWithUser = await Promise.all(
    posts.map(async (post) => {
      const user = await Users.findById(post.user).lean().exec();
      return { ...post, username: user.username };
    })
  );

  res.json(postsWithUser);
};

const createNewPost = async (req, res) => {
  const { user, title, content, category } = req.body;

  if (!user || !title || !content || !category) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const foundUser = await Users.findById(user).lean().exec();

  if (!foundUser) {
    return res.status(400).json({ message: `${user} user id not found` });
  }

  const post = await Posts.create({ user, title, content, category });

  if (post) {
    res.status(201).json({ message: "new post created" });
  } else {
    res.status(400).json({ message: "invalid post data" });
  }
};

const updatePost = async (req, res) => {
  const { id, user, title, content, category } = req.body;
  if (!id || !user || !title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const post = await Posts.findById(id).exec();

  if (!post) {
    return res.status(400).json({ message: "post not found" });
  }
  const foundUser = await Users.findById(user).lean().exec();

  if (!foundUser) {
    return res.status(400).json({ message: `${user} user id not found` });
  }

  post.user = user;
  post.title = title;
  post.content = content;
  post.category = category;

  const updatedPost = await post.save();
  res.json({ message: "update complete" });
};

const deletePost = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "post id required" });
  }

  const post = await Posts.findById(id).exec();
  if (!post) {
    return res.status(400).json({ message: "post not found" });
  }

  const result = await post.deleteOne();
  res.json(`Note '${result.title}' with ID ${result._id} deleted`);
};

module.exports = { getAllPosts, createNewPost, deletePost, updatePost };
