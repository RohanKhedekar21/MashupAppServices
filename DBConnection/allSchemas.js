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

let artistsSchema = mongoose.Schema({
    "artistsId": String,
    "artistsName": String,
    "artistsImgUrl": String
})

let albumsSchema = mongoose.Schema({
    "albumId": String,
    "albumName": String,
    "albumReleaseDate": String,
    "albumImgUrl": String
})

let languagesSchema = mongoose.Schema({
    "languageId": String,
    "languageName": String,
})

let bannerSchema = mongoose.Schema({
    "bannerId": String,
    "bannerPoster": String,
    "albumId": String
})

let usersSchema = mongoose.Schema({
    "userId": String,
    "email": String,
    "password": String
})

module.exports = [
    { schema: tracksSchema, collectionName: "tracks"},
    { schema: artistsSchema, collectionName: "artists"},
    { schema: albumsSchema, collectionName: "albums"},
    { schema: languagesSchema, collectionName: "languages"},
    { schema: bannerSchema, collectionName: "banner"},
    { schema: usersSchema, collectionName: "users"}
]