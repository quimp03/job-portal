const Role = require("../../models/roles.model");
const systemConfig = require("../../config/system")
// [GET] /admin/roles/
module.exports.index = async (req, res) => {
  // Find
  let find = {
    deleted: false,
  };
  // End Find
  const records = await Role.find(find);
  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
};
module.exports.createRole = async(req, res) => {
  res.render("admin/pages/roles/create.pug")
}
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();
  req.flash("success", `Cập nhật danh mục thành công!`);
  res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}
module.exports.detail = async(req, res) => {
  const id = req.params.id
  const dataRole = await Role.findOne({
    _id: id
  })
  res.render("admin/pages/roles/detail", {
    dataRole: dataRole
  })
}
module.exports.deleteRole = async (req, res) => {
  const id = req.params.id
  await Role.updateOne({
    _id: id
  }, {
    deleted: true
  })
  res.redirect("back")
}

module.exports.edit = async (req, res) => {
  const id = req.params.id
  const dataRole  = await Role.findOne({
    _id: id
  })
  res.render("admin/pages/roles/edit", {
    dataRole: dataRole
  })
}
module.exports.editPatch = async (req,res) => {
  const id = req.params.id
  try {
    await Role.updateOne({
      _id: id
    }, req.body)
    req.flash("success", `Cập nhật nhóm quyền thành công`)
    res.redirect("back")
  } catch (error) {
    req.flash("error", "Cập nhật nhóm quyền thất bại")
    console.log(error)
  }
}
module.exports.permissions = async (req, res) => {
  const records = await Role.find({
    deleted: false
  })
  res.render("admin/pages/roles/permissions",{
    records: records
  })
}
module.exports.editPathPermission = async(req, res) => {
  const roles = JSON.parse(req.body.roles);
  console.log(roles)
  for (const role of roles) {
    await Role.updateOne({
      _id: role.id,
      deleted: false
    }, {
      permissions: role.permissions
    });
  }

  req.flash("success", "Cập nhật phân quyền thành công!");
  res.redirect("back");
}