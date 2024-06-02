module.exports = (req) => {
    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        }, {
            name: "Đã duyệt",
            status: "active",
            class: ""
        },{
            name: "Chưa duyệt",
            status: "inactive",
            class: ""
        }
    ]
    if(req.query.status){
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active"
    }else{
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].class = "active"
    }
    return filterStatus
}