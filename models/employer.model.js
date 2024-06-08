const mongoose = require("mongoose");
const employerSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    tokenEmployer: String,
    phone: String,
    avatar: String,
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

const Employer = mongoose.model("Employer", employerSchema, "employers");
module.exports = Employer;