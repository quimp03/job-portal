const homeRoutes = require("./home.route");
const jobRoutes = require("./job.route")
module.exports = (app) => {
  app.use("/", homeRoutes);
  app.use("/job", jobRoutes)
}