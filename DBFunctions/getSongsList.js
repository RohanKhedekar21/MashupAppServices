const getAllModelsFromRequest = require("../DBConnection/getAllModelsFromRequest")

const getSongsList = async function(req, res, next) {
    console.log("Inside getSongsList")
    console.log("req.query",req.query);

    const { type, typeId } = req.query
    console.log("type ",type,"typeId ",typeId);

    const allModels = await getAllModelsFromRequest(req, "Mashup");

    const tracksModel = allModels.tracksModel;

    let queryString = {
        [type+"Id"] : typeId
    }
    let projectString = {
        _id: 0,
        // __v: 0,
        trackId: 1,
        trackTitle: 1,
        trackLength: 1,
        trackUrl: 1,
        albumImgUrl: 1
    } 
    let tracks = await tracksModel.find(queryString, projectString).exec();
    // console.log("tracks",tracks);

    res.json(tracks)
}

module.exports = getSongsList