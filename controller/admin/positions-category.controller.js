const PositionsCategory = require("../../models/positions-category.model")
const Account = require("../../models/accounts.model")
const systemConfig = require("../../config/system")
const createTreehelper =require("../../helpers/createTree.helper")
//[GET] admin/pages/products-category/index
module.exports.index = async(req, res) => {
    const records = await PositionsCategory.find({
        deleted: false
    })
    for (const record of records) {
        const createdBy = await Account.findOne({
            _id: record.createdBy
        })
        if(createdBy){
            record.createByFullName = createdBy.fullName
        }
    }

   res.render("admin/pages/positions-category/index",{
        pageTitle: "Danh mục khu vực",
        records: records
   })
}
//[GET] admin/pages/products-category/create
module.exports.create = async(req, res) => {
    const records = await PositionsCategory.find({
        deleted: false
    }); 
   
    const newRecords = createTreehelper(records)
    res.render("admin/pages/positions-category/create", {
        pageTitle: " Trang thêm mới danh mục công việc",
        records: newRecords
    })
}
//[POST] 
module.exports.createPost = async(req, res) => {
    console.log(req.body)
    //nếu biết được router thì ngta có thể dùng postman để test và có thể truy cập nên check lại 1 lần nữa
    if(!res.locals.role.permissions.includes("positions-category_create")){
        res.send("Không có quyền truy cập")
        return
    }
    if(req.body.position){
        req.body.position = parseInt(req.body.position)
    }else{
        const countProduct = await PositionsCategory.countDocuments()
       req.body.position = countProduct + 1
    }
    req.body.createdBy = res.locals.user.id
    const record = new PositionsCategory(req.body)
    await record.save()
    req.flash("success", `Thêm thành công`)
    res.redirect(`/${systemConfig.prefixAdmin}/positions-category`)
}
module.exports.changeStatusPositionCategory = async(req, res) => {
    const status = req.params.status
    const id = req.params.id
    await PositionsCategory.updateOne({
        _id: id
    }, {
        status: status
    })
    const namePositionsCategory = await PositionsCategory.findOne({
        _id: id
    })
    req.flash("success", `Cập nhật trạng thái ${namePositionsCategory.title} thành công`)
    res.redirect(`back`);
}
module.exports.deletePositionCategory = async(req, res) => {
    const id = req.params.id
    await PositionsCategory.updateOne({
        _id: id
    }, {
        deleted: true,
        deletedBy: res.locals.user.id,
        deletedAt: new Date()
    })
    res.redirect("back")
}
module.exports.detailPositionCategory = async(req, res) => {
    const id = req.params.id
    const detailPositionsCategory  = await PositionsCategory.findOne({
        _id: id,
        deleted: false
    })
    res.render("admin/pages/positions-category/detail", {
        pageTitle: "Trang chi tiết danh mục công việc",
        detailPositionsCategory: detailPositionsCategory
    })
}
module.exports.editPositionCatgory = async(req, res) => {
    const id = req.params.id
    const data = await PositionsCategory.findOne({
        _id: id
    }, {
        deleted: false
    })
    res.render("admin/pages/positions-category/edit", {
        pageTitle: "Trang chỉnh sửa danh mục công việc",
        data: data
    })
}
module.exports.editPatchPositionCategory = async(req, res) => {
    const id = req.params.id
    req.body.position = parseInt(req.body.position)
    try {
        await PositionsCategory.updateOne({
            _id: id
        }, req.body)
        req.flash("success", `Cập nhật danh mục thành công!`);
        res.redirect("back")
    } catch (error) {
        req.flash("error", `Cập nhật danh mục không thành công!`);
    }
}