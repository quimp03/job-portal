const Candidate = require("../../models/candidate.model")
const md5 = require("md5");
const generateHelper = require("../../helpers/generate.helper");
module.exports.register = async(req, res) => {
    res.render("client/pages/candidate/register.pug")
}
module.exports.registerPost = async(req, res) => {
    const existUser = await Candidate.findOne({
        email: req.body.email,
        deleted: false
      });
      if(existUser) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
      }
      const userInfo = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        tokenUser: generateHelper.generateRandomString(30)
      };
    
      const user = new Candidate(userInfo);
      await user.save();
      req.flash("success", "Đăng kí tài khoản thành công")
      res.cookie("tokenUser", user.tokenUser);
      res.redirect("back");
}
module.exports.login = async(req, res) => {
  res.render("client/pages/candidate/login.pug")
}
module.exports.loginPost = async(req, res) => {
  const email = req.body.email
  const password = req.body.password
  const user = await Candidate.findOne({
    email: email,
    deleted: false
  })
  if(!user){
    req.flash("error", "Email không tồn tại")
    res.redirect("back")
    return
  }
  if(md5(password) != user.password){
    req.flash("error", "Sai mật khẩu")
    res.redirect("back")
    return
  }
  if(user.status != "active"){
    req.flash("error", "Tài khoản đang bị khóa")
    res.redirect("back")
    return
  }
  res.cookie("tokenUser", user.tokenUser)
  res.redirect("/user/dashboard")
}