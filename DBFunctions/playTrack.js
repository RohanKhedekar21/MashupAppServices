const getAllModelsFromRequest = require("../DBConnection/getAllModelsFromRequest");

const playTrack = async function (req, res, next) {
    console.log("Inside playTrack")
    const allModels = await getAllModelsFromRequest(req, "Mashup");

    const tracksModel = allModels.tracksModel;

    let projectQuery = {
        _id : 0,
        __v: 0
    }
    let tracks = await tracksModel.find({}, projectQuery).exec();
    // console.log("tracks",tracks);
    res.json(tracks);
}

module.exports = playTrack;