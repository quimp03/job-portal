const md5 = require("md5");
const ForgotPassword = require("../../models/forgot-password.model")
const sendEmailHelper = require("../../helpers/sendEmail.helper")
const generateHelper = require("../../helpers/generate.helper");
const Employer = require("../../models/employer.model")
const JobsCategory = require("../../models/jobs-category.model");
const PositionCategory = require("../../models/positions-category.model")
const Apllicant = require("../../models/jobs.model")
const Profile = require("../../models/profile.model")
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
module.exports.managePosted = async (req, res) => {
  const id = req.params.id;
  try {
    const applicants = await Apllicant.find({
      parent_id: id,
      deleted: false
    });
    const users = [];
    for (const applicant of applicants) {
      for (const userId of applicant.uers_applied) {
        const profile = await Profile.findOne({
          _id: userId,
          deleted: false
        });
        
        if (profile) {
          users.push(profile);
        }
      }
    }
    res.render("client/pages/employer/manage-posted", {
      pageTitle: "Trang quản lí hồ sơ cá nhân",
      users: users
    });
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    res.status(500).send("Lỗi khi lấy dữ liệu");
  }
};
module.exports.appliedPost = async(req, res) => {
  const idUser = req.params.idUser
  const idCv = await Profile.findOne({
    parent_id: idUser
  })
  const idApplicant = req.params.idApplicant
  const job = await Apllicant.updateOne({
    _id: idApplicant
  }, {
    $push: { uers_applied: idCv.id }
  })
  res.redirect("back")
}
module.exports.deletedCv = async(req, res) => {
  const id = req.params.id
  await Profile.updateOne({
    _id: id
  },
    {
      deleted: true
    }
  )
  res.redirect("back")
}
module.exports.changeStatusPatch = async(req, res) => {
  const id = req.params.id
  const status = req.params.status
  await Profile.updateOne({
    _id: id,
    deleted: false
  }, {
    status: status
  })
  res.redirect("back")
}
module.exports.detailCv = async(req, res) => {
  const id = req.params.id
  const detailProfile = await Profile.findOne({
    _id: id,
    deleted: false
  })
  res.render("client/pages/employer/detail-cv", {
    pageTitle: "Trang chi tiết cv",
    detailProfile: detailProfile
  })
}

module.exports.forgotPassword = async(req, res) => {
  res.render("client/pages/employer/forgot-password", {
    pageTitle: "Trang quên mật khẩu"
  })
}
module.exports.forgotPasswordPost = async(req, res) => {
  const email = req.body.email
  const user = await Employer.findOne({
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
  res.redirect(`/employer/password/otp?email=${email}`)
}
module.exports.otpPassword = async(req, res) => {
  const email = req.query.email
  res.render("client/pages/employer/otp-password", {
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
  const employer = await Employer.findOne({
    email: email
  })
  res.cookie("tokenEmployer", employer.tokenEmployer)
  res.redirect("/employer/password/reset")
}
module.exports.resetPassword = async(req, res) => {
  res.render("client/pages/employer/reset-password", {
    pageTitle: "Reset password"
  })
}
module.exports.resetPasswordPost = async(req, res) => {
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword
  const tokenEmployer = req.cookies.tokenEmployer
  if(password != confirmPassword){
    req.flash("error", "Xác nhận mật khẩu không khớp")
    res.redirect("back")
    return
  }
  await Employer.updateOne({
    tokenEmployer: tokenEmployer
  }, {
    password: md5(password)
  })
  req.flash("success", "Đổi mật khẩu thành công!")
  res.redirect("/employer/login")
}