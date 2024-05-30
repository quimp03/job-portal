module.exports.myAccount = async(req, res) => {
    res.render("admin/pages/my-account/index", {
        pageTitle: "Trang thông tin cá nhân"
    })
}