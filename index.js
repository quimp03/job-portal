const express = require("express")
const dotenv = require("dotenv");

const routeClient = require("./routers/client/index.route");
const routeAdmin = require("./routers/admin/index.route")
const routeEmployer = require("./routers/employer/index.route")
const routeCandidate = require("./routers/candidate/index.route")


const systemConfig = require("./config/system.js")
const database = require('./config/database.js')
const methodOverride = require('method-override');
const bodyParser = require('body-parser');  
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const moment = require("moment")
dotenv.config();
const app = express()
database.connect();
app.use(express.static(`${__dirname}/public`))
//ghi đè pt form
app.use(methodOverride('_method'));
//flash hien thi thong bao sao khi thuc thi
app.use(cookieParser('QUIMAIPHUC'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End flash hiển thị thông báo 
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');
//đi vào thẳng đường dẫn views public
app.set('views', `${__dirname}/views`)
//set locals biến dùng trong all file pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
const port = process.env.PORT
routeClient(app)
routeAdmin(app)
routeEmployer(app)
routeCandidate(app)
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});