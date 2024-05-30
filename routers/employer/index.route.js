const dashboardRoutes = require("./dashboard.route");
const applicantRoute = require("./applicant.route")
module.exports = (app) => {
  app.use("/employer/dashboard", dashboardRoutes);
  app.use("/employer/applicant", applicantRoute)
}