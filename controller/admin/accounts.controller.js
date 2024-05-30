const Role = require("../../models/roles.model")
const Account = require("../../models/accounts.model")
const systemConfig = require("../../config/system")
const md5 = require("md5");
const generateHelper  = require("../../helpers/generate.helper")
module.exports.index = async(req, res) => {
    const records = await Account.find({
        deleted: false
    })
    for (const record of records) {
        const role = await Role.findOne({
          _id: record.role_id,
          deleted: false
        });
        record.roleTitle = role.title;
      }
    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Trang tài khoản",
        records: records
    })
}
module.exports.createAccount = async(req, res) => {
    const roles = await Role.find({
        deleted: false
    })
    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Trang tạo tài khoản",
        roles: roles
    })
}
module.exports.createPost = async(req, res) => {
    req.body.password = md5(req.body.password)
    req.body.token = generateHelper.generateRandomString(30)
    const account = new Account(req.body);
    await account.save()
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
}
module.exports.changeStatusPatch = async(req, res) => {
    const status = req.params.status
    const id = req.params.id
    await Account.updateOne({
        _id: id
    }, {
        status: status
    })
    const nameAccount = await Account.findOne({
        _id: id
    })
    req.flash("success", `Cập nhật trạng thái tài khoản ${nameAccount.fullName} thành công`)
    res.redirect(`back`);
}
module.exports.detailAccount = async(req, res) => {
    const id = req.params.id
    const account = await Account.findOne({
        _id: id
    })
        const role = await Role.findOne({
          _id: account.role_id,
          deleted: false
        });
        account.roleTitle = role.title;
    res.render("admin/pages/accounts/detail.pug", {
        pageTitle: "Trang chi tiết tài khoản",
        account: account
    })
}
module.exports.deleteAccount = async(req, res) => {
    const id = req.params.id
    const nameAccount = await Account.findOne({
        _id: id
    })
    try {
        await Account.updateOne({
            _id: id
        },{
            deleted: true
        })
        req.flash("success", `Xóa tài khoản ${nameAccount.fullName} thành công`)
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
    } catch (error) {
        req.flash("error",`Xóa tài khoản ${nameAccount.fullName} thất bại`)
        console.log(error)
    }
}
module.exports.editAccount = async(req, res) => {
    const id = req.params.id
    const dataAccount = await Account.findOne({
        _id: id,
        deleted: false
    })
    const roles = await Role.find({
        deleted: false,
      });
    res.render("admin/pages/accounts/edit.pug", {
        pageTitle: "Trang sửa tài khoản",
        dataAccount: dataAccount,
        roles: roles
    })
}
module.exports.editPatchAccount = async(req, res) => {
    const id = req.params.id
    req.body.password = md5(req.body.password)
    await Account.updateOne({
        _id: id
    },
        req.body 
    )
    const nameAccount = await Account.findOne({
        _id: id,
        deleted: false
    })
    req.flash('success', `Câp nhật tài khoản ${nameAccount.fullName} thành công`)
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
}