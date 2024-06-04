const Applicant =require("../../models/jobs.model")
const jobCategory = require("../../models/jobs-category.model")
const positionCategory = require("../../models/positions-category.model")
module.exports.index = async(req, res) => {
    const find = {
        deleted: false,
        status: "active"
    }
    // Search
    if(req.query.keyword) {
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
    }
    // End Search
    const records = await Applicant.find(find)
   
     //position
     for (const job of records) {
        const skill = await positionCategory.findOne({
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
        const skill = await jobCategory.findOne({
            _id: job.skill_category_id,
            deleted: false
        });
        if (skill) {
            job.kiNang = skill.title
        }
    }
    //end skill
    if(records.length === 0){
        req.flash("error", "Không tìm thấy công ty nào!")
    }
    res.render("client/pages/job/index", {
        pageTitle: "Trang công việc",
        records: records,
        keyword: req.query.keyword
    })
}
module.exports.jobsCategory = async(req, res) => {
    const slugJobCategory = req.params.slugJobsCategory
    //skills
    const skillCategory = await jobCategory.findOne({
        deleted: false,
        status: "active",
        slug: slugJobCategory
    })
    //end skills
   
    //pos
    const posCategory = await positionCategory.findOne({
        deleted: false,
        status: "active",
        slug: slugJobCategory
    })
    let records = []
    //end pos
    if(skillCategory){
         records = await Applicant.find({
            deleted:false,
            status: "active",
            skill_category_id: skillCategory.id
        })
    }else{
        records = await Applicant.find({
            deleted:false,
            status: "active",
            position_category_id: posCategory.id
        })
    }
    //viTri
    for (const job of records) {
        const skill = await jobCategory.findOne({
            _id: job.skill_category_id,
            deleted: false
        });
        if (skill) {
            job.kiNang = skill.title
        }
    }
    //end viTri
    //kiNang
    for (const job of records) {
        const skill = await positionCategory.findOne({
            _id: job.position_category_id,
            deleted: false
        });
        if (skill) {
            job.viTri = skill.title
        }
    }
    //end kiNang
    res.render("client/pages/job/index", {
        pageTitle : "Trang công việc",
        records: records
    })
}
module.exports.detailJob = async(req, res) => {
    const id = req.params.id
    const detailJob = await Applicant.findOne({
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
    const  skill = await jobCategory.findOne({
        _id: detailJob.skill_category_id,
        deleted: false
    });
    if (skill) {
        detailJob.kiNang = skill.title
    }
    //end skill
    res.render("client/pages/job/detail", {
        detailJob: detailJob
    })
}