const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const positionsCategorySchema = new mongoose.Schema(
    {
      title: String,
        parent_id: {
        type: String,
        default: "",
      },
      description: String,
      thumbnail: {
        type: String,
        default: ""
      },
      status: String,
      position: Number,
      slug: { type: String, slug: "title", unique: true },
      deleted: {
        type: Boolean,
        default: false,
      },
      createdBy: String,
      deletedAt: Date,
      deletedBy: String,
    },
    {
      timestamps: true,
    }
  );
  
  const PositionsCategory = mongoose.model("PositionsCategory", positionsCategorySchema, "positions-category");
  module.exports = PositionsCategory;