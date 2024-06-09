const Candidate = require("../../models/candidate.model");
const Profile = require("../../models/profile.model")
module.exports.infoUser = async (req, res, next) => {
  if(req.cookies.tokenUser) {
    const user = await Candidate.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false,
      status: "active"
    });

    if(user) {
      res.locals.user = user;
    }
  }

  next();
}
module.exports.profile = async (req, res, next) => {
  if(req.cookies.tokenProfile) {
    const profile = await Profile.findOne({
      tokenProfile: req.cookies.tokenProfile,
      deleted: false,
      status: "active"
    })
    if(profile) {
      res.locals.profile = profile;
    }
  }
  next();
}