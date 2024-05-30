const mongoose = require("mongoose")
const jobSchema = new mongoose.Schema({
    title : String,
    companyName: String,
    jobDescription: String,
    jobRequirement: String,
    thumbnail : String,
    salary: Number,
    skill_category_id: String,
    position_category_id: String,
    email: String,
    phoneNumber: String,
    nameHR: String,
    status : {
        type: String,
        default: "inactive"
    },
    deleted : {
        type: Boolean,
        default: false
    }
})
const Job = mongoose.model("Job", jobSchema, "jobs")
module.exports = Job