const mongoose = require("mongoose");

const settingGeneralSchema = new mongoose.Schema(
  {
    websiteName: String,
    banner: String,
    phone: String,
    facebook: String,
    tiktok: String,
    address: String,
    copyright: String
  },
  {
    timestamps: true,
  }
);
const SettingGeneral = mongoose.model("SettingGeneral", settingGeneralSchema, "settings-general");
module.exports = SettingGeneral;