const express = require("express");
const router = express.Router();
const path = require("path");
const postsController = require("../controller/postsController");
// const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);

router
  .route("/")
  .get(postsController.getAllPosts)
  .post(postsController.createNewPost)
  .patch(postsController.updatePost)
  .delete(postsController.deletePost);

// router.route("/:id").get(blogpostController.getSinglePost);

module.exports = router;
