const systemConfig = require("../../config/system");
const Account = require("../../models/accounts.model");
const Role = require("../../models/roles.model");

module.exports.requireAuth = async (req, res, next) => {
  if(!req.cookies.token) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    return;
  }
  const user = await Account.findOne({
    token: req.cookies.token,
    deleted: false,
    status: "active"
  });
  if(!user) {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    return;
  }
  const role = await Role.findOne({
    _id: user.role_id,
    deleted: false
  })
  //set user and role locals bien tuong tu nhu prefixAdmin
  res.locals.user = user
  res.locals.role = role
  next();
};