const express = require("express")
const dotenv = require("dotenv");
const routeClient = require("./routers/client/index.route");
const routeAdmin = require("./routers/admin/index.route")
const systemConfig = require("./config/system")
const database = require('./config/database.js')
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
dotenv.config();
const app = express()
database.connect();
app.use(express.static('public'));
app.use(methodOverride('_method'));
//flash hien thi thong bao sao khi thuc thi
app.use(cookieParser('QUIMAIPHUC'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End flash
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', './views');
app.locals.prefixAdmin = systemConfig.prefixAdmin;
const port = process.env.PORT
routeClient(app)
routeAdmin(app)
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});