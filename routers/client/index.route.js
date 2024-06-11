const homeRoutes = require("./home.route");
const jobRoutes = require("./job.route")
const candidateRoute = require("./candidate.route")
const employerRoute = require("../employer/employer.route")
const Blog = require("./blog.route")
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const userMiddleware = require("../../middlewares/candidate/candidate.middleware");
const employerMiddleware = require("../../middlewares/employer/employer.middleware")
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(categoryMiddleware.positionCategory)
  app.use(userMiddleware.infoUser)
  app.use(userMiddleware.profile)
  app.use(employerMiddleware.infoEmployer)
  app.use("/", homeRoutes);
  app.use("/job", jobRoutes)
  app.use("/candidate", candidateRoute)
  app.use("/employer", employerRoute)
  app.use("/blog", Blog)
}