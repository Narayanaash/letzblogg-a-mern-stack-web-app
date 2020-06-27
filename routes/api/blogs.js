const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// SET STORAGE
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

//Blog Model
const Blog = require("../../models/Blog");

//@route GET api/blogs
//@desc get all blogs
//@access Public
router.get("/", (req, res) => {
  Blog.find()
    .sort({ date: -1 })
    .then((blogs) => res.json(blogs));
});

//@route GET api/blogs/:id
//@desc get single blog
//@access Public
router.get("/:id", (req, res) => {
  Blog.findById(req.params.id).then((blog) => res.json(blog));
});

//@route POST api/blogs
//@desc Create a blog
//@access Public
router.post("/", auth, upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
  }
  const newBlog = new Blog({
    title: req.body.title,
    shortDesc: req.body.shortDesc,
    file: req.file.filename,
    description: req.body.description,
  });

  newBlog.save().then((blog) => res.json(blog));
});

//@route UPDATE api/blogs/:id
//@desc Update a blog
//@access Public
router.put("/:id", auth, (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((blog) => res.json(blog))
    .catch((err) => res.status(404).json({ success: false }));
});

//@route DELETE api/blogs/:id
//@desc Dlete a blog
//@access Public
router.delete("/:id", auth, (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => fs.unlink("uploads/" + blog.file))
    .catch((err) => console.log(err));

  Blog.findById(req.params.id)
    .then((blog) => blog.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
