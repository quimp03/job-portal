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
