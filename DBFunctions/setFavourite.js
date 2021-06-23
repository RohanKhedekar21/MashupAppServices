const dbName = require("../DBConnection/dbName");
const getAllModelsFromRequest = require("../DBConnection/getAllModelsFromRequest");

const setFavourite = async (req, res, next) => {
    console.log("Inside setFavourite",req.query);

    const { userId, songId } = req.query

    const allModels = await getAllModelsFromRequest(req, dbName)
    const favouriteSongsModel = allModels.favouriteSongsModel

    let queryString = {
        userId
    }
    let projectString = {
        _id: 0,
        userId: 1,
        songs: 1
    }
    let option = { upsert: true }
    let finalArr = []
    let msg = ""
    let resultState = "notSet"

    try{
        User = await favouriteSongsModel.findOne(queryString,projectString).exec();

        if(User !== null){
            let index = User.songs.indexOf(songId)
            if(index !== -1){
                User.songs.splice(index, 1);
                finalArr = User.songs
                msg = "Song is removed from favourite"
                resultState = "removeFav"
            }else{
                User.songs.push(songId)
                finalArr = User.songs
                msg = "Song is added as favourite"
                resultState = 'setFav'
            }
        }else{
            finalArr.push(songId)
            msg = "Song is added as favourite"
            resultState = "setFav"
        }
    }catch(err){
        console.log("catch error", err);
    }

    try{
        const updateDoc = {
            $set: {
                songs: finalArr
            }
        }
        const result = await favouriteSongsModel.updateOne(queryString, updateDoc, option)

    }catch(e){
        console.log("error",e)
    }

    console.log("message",msg)
    res.json({code: resultState, favSongs: finalArr, message: msg})
}

module.exports = setFavourite