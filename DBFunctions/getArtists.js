const getAllModelsFromRequest = require("../DBConnection/getAllModelsFromRequest");

const getArtists = async function (req, res, next) {
    console.log("Inside getArtists")
    const allModels = await getAllModelsFromRequest(req, "Mashup")

    const artistsModel = allModels.artistsModel;

    let projectQuery = {
        _id: 0
    }
    let artists = await artistsModel.find({}, projectQuery).exec();
    res.json(artists);
}

module.exports = getArtists;