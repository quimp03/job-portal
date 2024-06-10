const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    thumbnail: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.model("Blog", blogSchema, "blogs");
module.exports = Blog;