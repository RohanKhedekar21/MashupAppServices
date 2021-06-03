const mongoose = require("mongoose");

let tracksSchema = mongoose.Schema({
    "trackId": String,
    "trackTitle": String,
    "trackLength": String,
    "artistId": String,
    "albumId": String,
    "languageId": String,
    "url": String
})
const tracksModel = mongoose.model(
    "tracksModel",
    tracksSchema,
    "tracks"
)

let artistsSchema = mongoose.Schema({
    "artistsId": String,
    "artistsName": String,
    "artistsImgUrl": String
})
const artistsModel = mongoose.model(
    "artistsModel",
    artistsSchema,
    "artists"
)

let albumsSchema = mongoose.Schema({
    "albumId": String,
    "albumName": String,
    "albumReleaseDate": String,
    "albumImgUrl": String
})
const albumsModel = mongoose.model(
    "albumsModel",
    albumsSchema,
    "albums"
)

let languagesSchema = mongoose.Schema({
    "languageId": String,
    "languageName": String,
})
const languagesModel = mongoose.model(
    "languagesModel",
    languagesSchema,
    "languages"
)

let bannerSchema = mongoose.Schema({
    "bannerId": String,
    "bannerPoster": String,
    "albumId": String
})
const bannerModel = mongoose.model(
    "bannerModel",
    bannerSchema,
    "banner"
)

let usersSchema = mongoose.Schema({
    "userId": String,
    "email": String,
    "password": String
})
const usersModel = mongoose.model(
    "usersModel",
    usersSchema,
    "users"
)

let favouriteSongsSchema = mongoose.Schema({
    "userId": String,
    "songs": Array
})
const favouriteSongsModel = mongoose.model(
    "favouriteSongsModel",
    favouriteSongsSchema,
    "favouriteSongs"
)

module.exports = {
    tracksModel,
    artistsModel,
    albumsModel,
    languagesModel,
    bannerModel,
    usersModel,
    favouriteSongsModel
}

