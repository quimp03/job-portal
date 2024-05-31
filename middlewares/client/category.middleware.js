const jobsCategory = require("../../models/jobs-category.model");
const positionCategory = require("../../models/positions-category.model")
const createTreeHelper = require("../../helpers/createTree.helper");

module.exports.category = async (req, res, next) => {
  const jobCategory = await jobsCategory.find({
    deleted: false,
    status: "active"
  });

  const newJobCategory = createTreeHelper(jobCategory);
  res.locals.layoutJobCategory = newJobCategory;
  next();
}
module.exports.positionCategory = async (req, res, next) => {
    const posCategory = await positionCategory.find({
      deleted: false,
      status: "active"
    });
  
    const newPositionCategory = createTreeHelper(posCategory);
    res.locals.layoutPositionCategory = newPositionCategory;
    next();
  }