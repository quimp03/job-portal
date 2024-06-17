const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
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
    parent_id: String,
    nameHR: String,
    featured:{
        type: String,
        default: "0"
    },
    status : {
        type: String,
        default: "inactive"
    },
    deleted : {
        type: Boolean,
        default: false
    },
    uers_applied:{
        type: Array,
        default: []
    },
    slug: {
        type: String,
        slug: "title",
        unique: true,
    }
},
{
  timestamps: true,
}
)
const Job = mongoose.model("Job", jobSchema, "jobs")
module.exports = Job