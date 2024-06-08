
const employerRoute = require("./employer.route")
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const userMiddleware = require("../../middlewares/candidate/candidate.middleware");
const employerMiddleware = require("../../middlewares/employer/employer.middleware")
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(categoryMiddleware.positionCategory)
  app.use(userMiddleware.infoUser)
  app.use(employerMiddleware.infoEmployer)
  app.use("/employer", employerRoute)
}