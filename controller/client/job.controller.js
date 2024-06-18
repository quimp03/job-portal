const Applicant =require("../../models/jobs.model")
const jobCategory = require("../../models/jobs-category.model")
const positionCategory = require("../../models/positions-category.model")
const paginationHelper = require("../../helpers/pagination.helper")
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
     // Pagination
     const countJob = await Applicant.countDocuments(find);
     const objectPagination = paginationHelper(req,countJob)
     //  End Pagination
    const records = await Applicant.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
   
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
        keyword: req.query.keyword,
        objectPagination: objectPagination
    })
}
module.exports.jobsCategory = async (req, res) => {
    const slugJobCategory = req.params.slugJobsCategory;

    // find theo slug skill
    const skillCategory = await jobCategory.findOne({
        deleted: false,
        status: "active",
        slug: slugJobCategory
    });

    // find theo slug pos
    const posCategory = await positionCategory.findOne({
        deleted: false,
        status: "active",
        slug: slugJobCategory
    });

    let find = {
        deleted: false,
        status: "active"
    };

    if (skillCategory) {
        find.skill_category_id = skillCategory.id;
    } else if (posCategory) {
        find.position_category_id = posCategory.id;
    }

    // Pagination
    const countJob = await Applicant.countDocuments(find);
    const objectPagination = paginationHelper(req, countJob);

    const records = await Applicant.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

    for (const job of records) {
        const skill = await jobCategory.findOne({
            _id: job.skill_category_id,
            deleted: false
        });
        if (skill) {
            job.kiNang = skill.title;
        }
        
        const position = await positionCategory.findOne({
            _id: job.position_category_id,
            deleted: false
        });
        if (position) {
            job.viTri = position.title;
        }
    }
    res.render("client/pages/job/index", {
        pageTitle: "Trang công việc",
        records: records,
        objectPagination: objectPagination
    });
};
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