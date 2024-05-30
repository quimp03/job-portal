const JobsCategory = require("../../models/jobs-category.model");
const PositionCategory = require("../../models/positions-category.model")
const Apllicant = require("../../models/jobs.model")
const createTreeHelper = require("../../helpers/createTree.helper");
module.exports.crateApplicant = async(req, res) => {
    const category = await JobsCategory.find({
        deleted: false
      });
    const newCategory = createTreeHelper(category);
    const positonCategory = await PositionCategory.find({
        deleted: false
    })
    const newPositionCategory = createTreeHelper(positonCategory)
    res.render("employer/pages/applicant/create.pug", {
        category: newCategory,
        positonCategory: newPositionCategory
    })
}
module.exports.createPostApplicant = async(req, res) => {
    const record = new Apllicant(req.body)
    await record.save()
    res.redirect("back")
}
module.exports.myApplicant = async(req, res) => {
    res.render("employer/pages/applicant/myApplicant")
}