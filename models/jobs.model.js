const mongoose = require("mongoose")
const jobSchema = new mongoose.Schema({
    companyName: String,
    title : String,
    description: String,
    thumbnail : String,
    status : String,
    position : Number,
    location: String,
    salary: Number,
    typejob: String,
    deleted : {
        type: Boolean,
        default: false
    }
})
const Job = mongoose.model("Job", jobSchema, "jobs")
module.exports = Job