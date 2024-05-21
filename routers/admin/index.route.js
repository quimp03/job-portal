const dashboardRoute = require("./dashboard.route")
const jobRoute = require("./job.route")
const blogRoute = require("./blog.route")
const jobsCategoryRoute = require("./jobs-category.route")
const systemConfig = require("../../config/system")
module.exports = (app) => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`
    app.use(PATH_ADMIN + "/dashboard", dashboardRoute)
    app.use(PATH_ADMIN + "/jobs", jobRoute)
    app.use(PATH_ADMIN + "/blogs", blogRoute)
    app.use(PATH_ADMIN + "/jobs-category",jobsCategoryRoute)
}
