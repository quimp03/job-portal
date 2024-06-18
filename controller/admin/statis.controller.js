const Employer =require("../../models/employer.model")
const Candidate = require("../../models/candidate.model")
const Blog = require("../../models/blog.model")
const Job = require("../../models/jobs.model")
const Position = require("../../models/positions-category.model")
module.exports.statis = async(req, res) => {
    const find = {
        deleted: false
    }
    const countEmployer = await Employer.countDocuments(find)
    const countCandidate = await Candidate.countDocuments(find)
    const countJob = await Job.countDocuments(find)
    const countJobActive = await Job.countDocuments({deleted: false, status: "active"})
    const countJobInactive =  await Job.countDocuments({deleted: false, status: "inactive"})
    const countBlog = await Blog.countDocuments(find)
    const Jobs = await Job.find(find)
    var users = []
    for (const user of Jobs) {
        let count = 0;
        let tam = user.uers_applied
        for (let index = 1; index <= tam.length; index++) {
            count++
        }
        if(count >=3){
            users.push(user)
        }
    }
    const countPosteds = users.length

    const profiles = await Job.find({
        deleted: false
    }).limit(8).sort({createdAt: "desc"})
    for (const pos of profiles) {
        const position = await Position.findOne({
            deleted: false,
            _id: pos.position_category_id
        })
        if(position){
            pos.viTri = position.title
        }
    }
    res.render("admin/pages/statis/index", {
        pageTitle: "Trang thống kê",
        countEmployer: countEmployer,
        countCandidate: countCandidate,
        countJob: countJob,
        countJobActive: countJobActive,
        countJobInactive: countJobInactive,
        countBlog: countBlog,
        countJobAppied:countPosteds,
        profiles: profiles
    })
}