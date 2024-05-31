const homeRoutes = require("./home.route");
const jobRoutes = require("./job.route")
const categoryMiddleware = require("../../middlewares/client/category.middleware");
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(categoryMiddleware.positionCategory)
  app.use("/", homeRoutes);
  app.use("/job", jobRoutes)
}