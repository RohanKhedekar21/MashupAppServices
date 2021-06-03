const getAllModelsFromRequest = require("../DBConnection/getAllModelsFromRequest")

const getSongsList = async function(req, res, next) {
    console.log("Inside getSongsList")
    console.log("req.query",req.query);

    const { type, typeId, userId } = req.query
    console.log("type ",type,"typeId ",typeId,"userId",userId);

    const allModels = await getAllModelsFromRequest(req, "Mashup");

    const tracksModel = allModels.tracksModel;
    const favouriteSongsModel = allModels.favouriteSongsModel;

    let favSongsList = [];
    let tracks = [];

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
    
    try{
        const searchQuery = { userId }
        const projectQuery = { _id: 0, songs: 1}
        let FavSongs = await favouriteSongsModel.findOne(searchQuery, projectQuery).exec()
        if(FavSongs && FavSongs.songs.length > 0){
            favSongsList = FavSongs.songs
        }
        // console.log("favSongsList",favSongsList)
        await tracksModel.find(queryString, projectString).exec(async function(err, data){
            // console.log("data",data)
            if(!err){
                await data.map((item,index) => {
                    let tempObj = {}
                    
                    let isFav = favSongsList.some(id => item.trackId === id)
                    
                    tempObj = JSON.parse(JSON.stringify(item))
                    tempObj.isFav = isFav
                    // tempObj = item
                    // console.log("tempObj",tempObj);
                    tracks.push(tempObj)
                })
                console.log("new Data",tracks);
                // tracks = data
                res.json(tracks)
            }
        });
    }catch(err){
        console.log("Error",err);
    }
}

module.exports = getSongsList