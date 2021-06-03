const getAllModelsFromRequest = require("../DBConnection/getAllModelsFromRequest")

const getFavourite = async (req, res, next) => {
    console.log("Inside getFavourite",req.query)

    const {
        userId
    } = req.query

    const allModels = await getAllModelsFromRequest(req, "Mashup")
    const favouriteSongsModel = allModels.favouriteSongsModel
    const tracksModel = allModels.tracksModel

    let favList = []
    let tracks = []

    try{
        let queryString = {
            userId
        }
        let projectString = {
            _id: 0,
            songs: 1
        }
        favList = await favouriteSongsModel.findOne(queryString, projectString).exec()
        console.log("favList",favList);
        
        for(const item of favList.songs){
            let queryString = {
                trackId: item
            }
            let projectQuery = {
                _id: 0
            }
            let trackObj = await tracksModel.findOne(queryString, projectQuery).exec()
            
            tempObj = JSON.parse(JSON.stringify(trackObj))

            tempObj.isFav = true
            // console.log("obj",tempObj)

            tracks.push(tempObj)
        }
        
        
    }catch(e){
        console.log("Error",e)
    }

    res.json({result: 'success',data: tracks})
}

module.exports = getFavourite