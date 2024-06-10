const Candidate = require("../../models/candidate.model")
const md5 = require("md5");
const generateHelper = require("../../helpers/generate.helper");
const ForgotPassword = require("../../models/forgot-password.model")
const sendEmailHelper = require("../../helpers/sendEmail.helper");
const router = require("../../routers/client/candidate.route");
const Profile = require("../../models/profile.model")
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
      res.redirect("back");
}
module.exports.login = async(req, res) => {
  res.render("client/pages/candidate/login.pug", {
    pageTitle: "Trang đăng nhập"
  })
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
  const findProfile = await Profile.findOne({
    parent_id: user.id
  })
  if(findProfile){
    res.cookie("tokenProfile", findProfile.tokenProfile)
  }
  res.cookie("tokenUser", user.tokenUser)
  res.redirect("/")
}
module.exports.logout = async(req, res) => {
  res.clearCookie("tokenUser")
  res.clearCookie("tokenProfile")
  res.redirect("/")
}
module.exports.forgotPassword = async(req, res) => {
  res.render("client/pages/candidate/forgot-password", {
    pageTitle: "Trang quên mật khẩu"
  })
}
module.exports.forgotPasswordPost = async(req, res) => {
  const email = req.body.email
  const user = await Candidate.findOne({
    email: email,
    deleted: false
  })
  if(!user){
    req.flash("error", "Email không tồn tại")
    res.redirect("back")
    return
  }
  const otp = generateHelper.generateRandomNumber(6)
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now() + 3*60*1000 
    // expireAt: ton tai trong timeset
  }
  const forgotPassword = new ForgotPassword(objectForgotPassword)
  await forgotPassword.save()
  const subject = "Lấy lại mật khẩu"
  const text = `Mã OTP xác thực tài khoản của bạn là : ${otp}. Vui lòng không cung cấp này với bất kì ai.`
  sendEmailHelper.sendEmail(email,subject, text)
  res.redirect(`/candidate/password/otp?email=${email}`)
}
module.exports.otpPassword = async(req, res) => {
  const email = req.query.email
  res.render("client/pages/candidate/otp-password", {
    pageTitle: "Nhập mã otp",
    email: email
  })
}
module.exports.otpPasswordPost = async(req, res) => {
  const email = req.body.email
  const otp = req.body.otp
  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp
  })
  if(!result){
    req.flash("error", "Mã OTP không hợp lệ")
    res.redirect("back")
    return
  }
  const candidate = await Candidate.findOne({
    email: email
  })
  res.cookie("tokenUser", candidate.tokenUser)
  res.redirect("/candidate/password/reset")
}
module.exports.resetPassword = async(req, res) => {
  res.render("client/pages/candidate/reset-password", {
    pageTitle: "Reset password"
  })
}
module.exports.resetPasswordPost = async(req, res) => {
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword
  const tokenUser = req.cookies.tokenUser
  if(password != confirmPassword){
    req.flash("error", "Xác nhận mật khẩu không khớp")
    res.redirect("back")
    return
  }
  await Candidate.updateOne({
    tokenUser: tokenUser
  }, {
    password: md5(password)
  })
  req.flash("success", "Đổi mật khẩu thành công!")
  res.redirect("/candidate/login")
}
module.exports.profileCandidate = async(req,res) => {
  res.render("client/pages/candidate/profile", {
    pageTitle: "Tạo hồ sơ cá nhân"
  })
}
module.exports.profilePost = async(req, res) => {
  const tokenUser = req.cookies.tokenUser
  const user = await Candidate.findOne({
    tokenUser: tokenUser
  })
  const tokenProfile =  generateHelper.generateRandomString(30)
  const profile = new Profile(req.body)
  profile.parent_id = user.id
  profile.tokenProfile = tokenProfile
  await profile.save()
  res.cookie("tokenProfile", profile.tokenProfile)
  res.redirect("/")
}
module.exports.detailProfile = async(req, res) => {
  const user = req.cookies.tokenProfile
  const inforUser = await Profile.findOne({
    tokenProfile: user,
    status: "active",
    deleted: false
  })
  res.render("client/pages/candidate/detail-profile", {
    pageTitle: "Trang chi tiết hồ sơ",
    inforUser: inforUser
  })
}
module.exports.editProfile = async(req, res) =>{
  const id = req.params.id
  const profile = await Profile.findOne({
    _id: id,
    deleted: false,
    status: "active"
  })
  res.render("client/pages/candidate/edit-profile", {
    pageTitle: "Trang chỉnh sửa",
    profile: profile
  })
}
module.exports.updateProfile = async(req, res) => {
  const id = req.params.id
  await Profile.updateOne({
    _id: id,
  },
    req.body
)
  req.flash("success", "Cập nhật thành công")
  res.redirect("/candidate/detail-profile")
}