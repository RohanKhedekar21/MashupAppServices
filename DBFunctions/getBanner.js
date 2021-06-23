const getAllModelsFromRequest = require("../DBConnection/getAllModelsFromRequest");

const getBanner = async function (req, res, next) {
    console.log("Inside getAdvertise")
    const allModels = await getAllModelsFromRequest(req, "Mashup");

    const bannerModel = allModels.bannerModel;

    let projectQuery = {
        _id: 0
        // __v: 0
    }
    let banner = await bannerModel.find({},projectQuery).exec();
    // console.log("banner",banner);
    res.json(banner);
}

module.exports = getBanner;