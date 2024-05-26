const JobsCategory = require("../../models/jobs-category.model")
const systemConfig = require("../../config/system")
const createTreehelper =require("../../helpers/createTree.helper")
const createTreeHelper = require("../../helpers/createTree.helper")
//[GET] admin/pages/products-category/index
module.exports.index = async(req, res) => {
    const records = await JobsCategory.find({
        deleted: false
    })
   res.render("admin/pages/jobs-category/index",{
        pageTitle: "Danh mục sản phẩm",
        records: records
   })
}
//[GET] admin/pages/products-category/create
module.exports.create = async(req, res) => {
    const records = await JobsCategory.find({
        deleted: false
    }); 
   
    const newRecords = createTreehelper(records)
    res.render("admin/pages/jobs-category/create", {
        pageTitle: "Thêm mới danh mục sản phẩm",
        records: newRecords
    })
}
//[POST] 
module.exports.createPost = async(req, res) => {
    if(req.body.position){
        req.body.position = parseInt(req.body.position)
    }else{
        const countProduct = await JobsCategory.countDocuments()
       req.body.position = countProduct + 1
    }
    const record = new JobsCategory(req.body)
    await record.save()
    req.flash("success", `Thêm thành công`)
    res.redirect(`/${systemConfig.prefixAdmin}/jobs-category`)
}
module.exports.changeStatusJobscategory = async(req, res) => {
    const status = req.params.status
    const id = req.params.id
    await JobsCategory.updateOne({
        _id: id
    }, {
        status: status
    })
    const nameJobsCategory = await JobsCategory.findOne({
        _id: id
    })
    req.flash("success", `Cập nhật trạng thái ${nameJobsCategory.title} thành công`)
    res.redirect(`back`);
}
module.exports.deleteCategory = async(req, res) => {
    const id = req.params.id
    await JobsCategory.updateOne({
        _id: id
    }, {
        deleted: true
    })
    const nameJobsCategory = await JobsCategory.findOne({
        _id: id
    })
    req.flash("success", `Xóa ${nameJobsCategory.title} thành công`)
    res.redirect("back")
}
module.exports.detailCategory = async(req, res) => {
    const id = req.params.id
    const detailJobsCategory  = await JobsCategory.findOne({
        _id: id,
        deleted: false
    })
    res.render("admin/pages/jobs-category/detail", {
        detailJobsCategory: detailJobsCategory
    })
}
module.exports.edit = async(req, res) => {
    const id = req.params.id
    const data = await JobsCategory.findOne({
        _id: id
    }, {
        deleted: false
    })
    res.render("admin/pages/jobs-category/edit", {
        data: data
    })
}
module.exports.editPatchCategory = async(req, res) => {
    const id = req.params.id
    req.body.position = parseInt(req.body.position)
    try {
        await JobsCategory.updateOne({
            _id: id
        }, req.body)
        req.flash("success", `Cập nhật danh mục thành công!`);
        res.redirect("back")
    } catch (error) {
        req.flash("error", `Cập nhật danh mục không thành công!`);
    }
}