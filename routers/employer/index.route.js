const dashboardRoutes = require("./dashboard.route");
const applicantRoute = require("./applicant.route")
const myApplicantRoute = require("./myApplicant.route")
module.exports = (app) => {
  app.use("/employer/dashboard", dashboardRoutes);
  app.use("/employer/applicant", applicantRoute)
  app.use("/employer/myApplicant",myApplicantRoute)
}