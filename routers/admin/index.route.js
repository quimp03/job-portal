const dashboardRoute = require("./dashboard.route")
const jobRoute = require("./job.route")
const blogRoute = require("./blog.route")
const jobsCategoryRoute = require("./jobs-category.route")
const positionsCategoryRoute = require("./positions-category.route")
const roleRoute = require("./roles.route");
const accountRoute = require("./accounts.route")
const authRoute = require("./auth.route.js")
const myAccountRoute = require("./myAccount.route.js")
const systemConfig = require("../../config/system")
const authMiddleware = require("../../middlewares/admin/auth.middleware");
module.exports = (app) => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`
    app.use(PATH_ADMIN + "/dashboard",authMiddleware.requireAuth, dashboardRoute)
    app.use(PATH_ADMIN + "/jobs",authMiddleware.requireAuth, jobRoute)
    app.use(PATH_ADMIN + "/blog",authMiddleware.requireAuth, blogRoute)
    app.use(PATH_ADMIN + "/jobs-category",authMiddleware.requireAuth,jobsCategoryRoute)
    app.use(PATH_ADMIN + "/positions-category",authMiddleware.requireAuth,positionsCategoryRoute)
    app.use(PATH_ADMIN + "/roles",authMiddleware.requireAuth, roleRoute)
    app.use(PATH_ADMIN + "/accounts",authMiddleware.requireAuth, accountRoute)
    app.use(PATH_ADMIN + "/auth", authRoute)
    app.use(PATH_ADMIN + "/my-account", authMiddleware.requireAuth, myAccountRoute)
}
