const Blog = require("../../models/blog.model")
module.exports.index =async(req, res) => {
    const blogs = await Blog.find({
        deleted: false,
        status: "active"
    })
    res.render("client/pages/home/blog.pug", {
        blogs: blogs
    })
}
module.exports.detailBlog = async(req, res) => {
    const id = req.params.id
    const blog = await Blog.findOne({
        _id: id,
        deleted: false,
        status: "active"
    })
    res.render("client/pages/home/detail-blog", {
        blog: blog
    })
}