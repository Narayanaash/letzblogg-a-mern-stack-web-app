const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// SET STORAGE
const storage = multer.diskStorage({
  destination: "client/public/uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

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
//@access Private
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
    userId: req.user.id,
  });

  newBlog.save().then((blog) => res.json(blog));
});

//@route UPDATE api/blogs/:id
//@desc Update a blog
//@access Private
router.put("/:id", auth, upload.single("file"), (req, res) => {
  Blog.findById(req.params.id).then((blog) => {
    if (req.user.id !== blog.userId) {
      return res.status(400).json({ msg: "Not authorized to update" });
    } else {
      if (req.file) {
        Blog.findById(req.params.id).then((blog) => {
          try {
            fs.unlinkSync("client/public/uploads/" + blog.file);
          } catch (error) {
            console.error(error);
          }
        });
        Blog.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
            file: req.file.filename,
            userId: req.user.id,
          },
          { new: true }
        )
          .then((blog) => res.json(blog))
          .catch((err) => res.status(404).json({ success: false }));
      } else {
        Blog.findByIdAndUpdate(
          req.params.id,
          { $set: req.body, userId: req.user.id },
          { new: true }
        )
          .then((blog) => res.json(blog))
          .catch((err) => res.status(404).json({ success: false }));
      }
    }
  });
});

//@route DELETE api/blogs/:id
//@desc Dlete a blog
//@access Private
router.delete("/:id", auth, (req, res) => {
  Blog.findById(req.params.id).then((blog) => {
    if (req.user.id !== blog.userId) {
      return res.status(400).json({ msg: "Not authorized to delete" });
    } else {
      Blog.findById(req.params.id).then((blog) => {
        try {
          fs.unlinkSync("client/public/uploads/" + blog.file);
        } catch (error) {
          console.error(error);
        }
      });

      Blog.findById(req.params.id)
        .then((blog) => blog.remove().then(() => res.json({ success: true })))
        .catch((err) => res.status(404).json({ success: false }));
    }
  });
});

module.exports = router;
