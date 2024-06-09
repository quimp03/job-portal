const md5 = require("md5");
const generateHelper = require("../../helpers/generate.helper");
const Employer = require("../../models/employer.model")
const JobsCategory = require("../../models/jobs-category.model");
const PositionCategory = require("../../models/positions-category.model")
const Apllicant = require("../../models/jobs.model")
const createTreeHelper = require("../../helpers/createTree.helper");

module.exports.register = async(req, res) => {
    res.render("client/pages/employer/register")
}
module.exports.registerPost = async(req, res) => {
    const existEmployer = await Employer.findOne({
        email: req.body.email,
        deleted: false
      });
      if(existEmployer) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
      }
      const employerInfo = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        password: md5(req.body.password),
        tokenEmployer: generateHelper.generateRandomString(30)
      };
      const employer = new Employer(employerInfo);
      await employer.save();
      req.flash("success", "Đăng kí tài khoản thành công")
      res.redirect("back");
}
module.exports.login= async(req, res) => {
  res.render("client/pages/employer/login")
}
module.exports.loginPost = async(req, res) => {
  const email = req.body.email
  const password = req.body.password
  const employer = await Employer.findOne({
    email: email,
    deleted: false
  })
  if(!employer){
    req.flash("error", "Email không tồn tại")
    res.redirect("back")
    return
  }
  if(md5(password) != employer.password){
    req.flash("error", "Sai mật khẩu")
    res.redirect("back")
    return
  }
  if(employer.status != "active"){
    req.flash("error", "Tài khoản đang bị khóa")
    res.redirect("back")
    return
  }
  res.cookie("tokenEmployer", employer.tokenEmployer)
  res.redirect("/")
}
module.exports.createApplicant = async(req,res) => {
  const category = await JobsCategory.find({
    deleted: false
  });
  const newCategory = createTreeHelper(category);
  const positonCategory = await PositionCategory.find({
      deleted: false
  })
  const newPositionCategory = createTreeHelper(positonCategory)
  res.render("client/pages/employer/createApplicant.pug", {
      category: newCategory,
      positonCategory: newPositionCategory
  })
}
module.exports.createApplicantPost = async(req, res) => {
  const employer = await Employer.findOne({
    tokenEmployer: req.cookies.tokenEmployer
  })
  let record = new Apllicant(req.body)
  record.parent_id = employer.id
  await record.save()
  res.redirect("back")
}
module.exports.logout = async(req, res) => {
  res.clearCookie("tokenEmployer");
  res.redirect("/")
}
module.exports.myPosted = async(req, res) => {
  const find = await Employer.findOne({
    tokenEmployer: req.cookies.tokenEmployer,
    deleted:false
  })
  const records = await Apllicant.find({
    parent_id: find.id,
    deleted: false
  })
   //position
   for (const job of records) {
    const skill = await PositionCategory.findOne({
        _id: job.position_category_id,
        deleted: false
    });
    if (skill) {
        job.viTri = skill.title
    }
}
    //end position
    //skill
    for (const job of records) {
        const skill = await JobsCategory.findOne({
            _id: job.skill_category_id,
            deleted: false
        });
        if (skill) {
            job.kiNang = skill.title
        }
    }
    //end skill
  res.render("client/pages/employer/myPosted.pug", {
    records: records
  })
}
module.exports.myPostedDelete = async(req, res) => {
    const id = req.params.id
    const namePosted = await Apllicant.findOne({
        _id: id
    })
    try {
        await Apllicant.deleteOne({
            _id: id
        })
        req.flash("success", `Xóa tài khoản ${namePosted.fullName} thành công`)
        res.redirect(`back`)
    } catch (error) {
        req.flash("error",`Xóa tài khoản ${namePosted.fullName} thất bại`)
        console.log(error)
    }
}