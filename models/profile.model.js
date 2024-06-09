const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema(
  {
    fullName: String,
    date: Date,
    sex: String,
    email: String,
    phone: String,
    parent_id: String,
    tokenProfile: String,
    kiNang: String,
    hocVan: String,
    kinhNghiem: String,
    mucTieu: String,
    status: {
      type: String,
      default: "active"
    },
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

const Profile = mongoose.model("Profile", profileSchema, "profile");
module.exports = Profile;