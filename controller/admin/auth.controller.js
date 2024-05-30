const md5 = require("md5");
const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
    res.render("admin/pages/auth/login.pug", {
        pageTitle: "Dang nhap"
    })
}
module.exports.loginPost = async(req, res) => {
    const password = req.body.password
    const email = req.body.email
    const user = await Account.findOne({
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
    res.cookie("token", user.token);//cookie se luu theo phien
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
}
module.exports.logout = async(req, res) => {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
}