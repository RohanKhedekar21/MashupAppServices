const getAllModelsFromRequest = require("../DBConnection/getAllModelsFromRequest");

const getAlbum = async function (req, res, next) {
    console.log("Inside getAlbum");

    const allModels = await getAllModelsFromRequest(req, "Mashup");

    const albumsModel = allModels.albumsModel;

    let projectQuery = {
        _id: 0
    }
    let albums = await albumsModel.find({}, projectQuery).exec();
    res.json(albums)
}

module.exports = getAlbum;