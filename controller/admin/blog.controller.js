const Blog = require("../../models/blog.model")
module.exports.index = async(req, res) => {
    const blogs = await Blog.find({
        deleted: false,
    })
    res.render("admin/pages/blogs/index", {
        pageTitile: "Trang blog",
        blogs: blogs
    })
 }
module.exports.create = async(req, res) => {
    res.render("admin/pages/blogs/create", {
        pageTitile: "Tạo blog"
    })
}
module.exports.createPost = async(req, res) => {
    const blog = new Blog(req.body)
    await blog.save()
    res.redirect("back")
}
module.exports.changeStatusPatch = async(req, res) => {
    const status = req.params.status;
    const id = req.params.id;
  try {
    await Blog.updateOne({
        _id: id
      }, {
        status: status
      });
      req.flash("success", `Cập nhật trạng thái thành công`)
      res.redirect(`back`);
  } catch (error) {
    console.log(error)
    return;
  }
}
module.exports.deleteBlog = async(req, res) => {
    const id = req.params.id;
    await Blog.updateOne({
      _id: id
    }, {
        deleted: true
    });
    const nameBlog = await Blog.findOne({
        _id: id
    })
    req.flash("success", `Xóa công ty ${nameBlog.title} thành công`)
    res.redirect("back");
}
module.exports.detailBlog = async(req, res) => {
    const id = req.params.id
    const blog = await Blog.findOne({
        _id: id,
        deleted: false
    })
    res.render("admin/pages/blogs/detail", {
        pageTitile: "Trang chi tiết blog",
        blog: blog
    })
}
module.exports.editBlog = async(req,res) => {
    const id = req.params.id
    const blog = await Blog.findOne({
        _id: id,
        deleted: false
    })
    res.render("admin/pages/blogs/edit", {
        pageTitile: "Trang chỉnh sửa",
        blog: blog
    })
}
module.exports.editPatch = async(req, res) => {
   
    const id = req.params.id
    try {
        await Blog.updateOne({
            _id: id
        }, 
        req.body)
        req.flash("success", `Cập nhật danh mục thành công!`);
        res.redirect("back")
    } catch (error) {
        req.flash("error", `Cập nhật danh mục không thành công!`);
    }
}