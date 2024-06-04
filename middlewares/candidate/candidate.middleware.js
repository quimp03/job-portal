const Candidate = require("../../models/candidate.model");

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