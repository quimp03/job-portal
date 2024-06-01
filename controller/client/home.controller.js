const Job = require("../../models/jobs.model")
const jobCategory = require("../../models/jobs-category.model")
const positionCategory = require("../../models/positions-category.model")
module.exports.index = async(req, res) => {
    const jobsFeatured = await Job.find({
        deleted: false,
        status: "active",
        featured: "1"
    }).limit(6)
    //position
    for (const job of jobsFeatured) {
        const skill = await positionCategory.findOne({
            _id: job.position_category_id,
            deleted: false
        });
        if (skill) {
            job.viTri = skill.title
        }
    }
    //end position
    res.render("client/pages/home/index",{
        jobsFeatured: jobsFeatured
    });
}
module.exports.detail = async(req, res) => {
    const id = req.params.id
    const detailJob = await Job.findOne({
        _id: id,
    })
    //position
        const pos = await positionCategory.findOne({
            _id: detailJob.position_category_id,
            deleted: false
        });
        if (pos) {
            detailJob.viTri = pos.title
        }
    //end position
    //sklill
    //position
    const  skill= await jobCategory.findOne({
        _id: detailJob.skill_category_id,
        deleted: false
    });
    if (skill) {
        detailJob.kiNang = skill.title
    }
//end position
    //end skill
    res.render("client/pages/home/detail", {
        detailJob: detailJob
    })
}