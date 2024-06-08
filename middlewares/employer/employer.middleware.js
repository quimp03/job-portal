const Employer = require("../../models/employer.model");

module.exports.infoEmployer = async (req, res, next) => {
  if(req.cookies.tokenEmployer) {
    const employer = await Employer.findOne({
      tokenEmployer: req.cookies.tokenEmployer,
      deleted: false,
      status: "active"
    });

    if(employer) {
      res.locals.employer = employer;
    }
  }
  next();
}