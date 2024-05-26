const Job = require("../../models/jobs.model")
const filterHelper = require("../../helpers/filter.helper")
const paginationHelper = require("../../helpers/pagination.helper")
module.exports.index = async(req, res) => {
    const find = {
        deleted: false,
    }
//filter-status
    const filterStatus = filterHelper(req)
//end filter-status
    if(req.query.status){
        find.status = req.query.status
    }
// Search
    if(req.query.keyword) {
        const regex = new RegExp(req.query.keyword, "i");
        find.companyName = regex;
    }
// End Search
// Pagination
    const countJob = await Job.countDocuments(find);
    const objectPagination = paginationHelper(req,countJob)
//  End Pagination
    const jobs = await Job.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
    res.render("admin/pages/job/index",{
        jobs: jobs,
        filterStatus: filterStatus,
        keyword: req.query.keyword,
        objectPagination: objectPagination
    })
}
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
  
    await Job.updateOne({
      _id: id
    }, {
      status: status
    });
    const nameCompany = await Job.findOne({
        _id: id
    })
    req.flash("success", `Cập nhật trạng thái công ty ${nameCompany.companyName} thành công`)
    res.redirect(`back`);
}
// [PATCH] /admin/jobs/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    let ids = req.body.ids;
    ids = ids.split(", ");
    switch (type) {
        case "active":
        case "inactive":
            await Job.updateMany({
            _id: { $in: ids }
            }, {
            status: type
            });
        req.flash("success", `Cập nhật trạng thái các công ty thành công`)
        break;
        case "delete-all":
            await Job.updateMany({
                _id: { $in: ids }
            }, {
                deleted: true
            });
        req.flash("success", "Xóa các công ty thành công")
      default:
        break;
    }
    res.redirect(`back`);
}
module.exports.deleteItem = async(req, res) => {
    const id = req.params.id;
    await Job.updateOne({
      _id: id
    }, {
        deleted: true
    });
    const nameCompany = await Job.findOne({
        _id: id
    })
    req.flash("success", `Xóa công ty ${nameCompany.companyName} thành công`)
    res.redirect("back");
}
module.exports.detailItem = async(req, res) => {
    const id = req.params.id
    console.log(id)
    const jobs = await Job.findOne({
        _id: id
    })
    res.render("admin/pages/job/detail", {
        jobs: jobs
    })
}