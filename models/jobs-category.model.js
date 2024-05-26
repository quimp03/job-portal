const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const jobsCategorySchema = new mongoose.Schema(
    {
      title: String,
          parent_id: {
        type: String,
        default: "",
      },
      description: String,
      thumbnail: String,
      status: String,
      position: Number,
      slug: { type: String, slug: "title", unique: true },
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
  
  const JobsCategory = mongoose.model("JobsCategory", jobsCategorySchema, "jobs-category");
  module.exports = JobsCategory;