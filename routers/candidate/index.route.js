const homeRoute = require('./home.route.js')
const userMiddleware = require("../../middlewares/candidate/candidate.middleware");
module.exports = (app) => {
  app.use(userMiddleware.infoUser)
  app.use("/user", homeRoute)
}