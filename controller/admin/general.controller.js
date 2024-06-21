const General = require("../../models/setting-genaral.model")
module.exports.general = async(req, res) =>{
    const settingGeneral = await General.findOne({})
    res.render("admin/pages/setting/general", {
        pageTitle: "Trang cài đặt",
        settingGeneral: settingGeneral
    }
    )
}
module.exports.generalPatch = async(req, res) => {
    const settingGeneral = await General.findOne({})
    if(settingGeneral){
        await General.updateOne({
            _id: settingGeneral.id
        }, req.body)
    }
    else{
        const record = new General(req.body)
        await record.save()
    }
   
    res.redirect("back")
}