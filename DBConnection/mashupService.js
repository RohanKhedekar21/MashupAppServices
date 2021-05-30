let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let dbData = require("./DBpaths");

const playTrack = require("../DBFunctions/playTrack");
const getBanner = require('../DBFunctions/getBanner');
const getAlbum = require('../DBFunctions/getAlbum');
const getArtists = require('../DBFunctions/getArtists');
const getSongsList = require('../DBFunctions/getSongsList');
const sentOtpEmail = require('../DBFunctions/sentOtpEmail');
const doLogin = require('../DBFunctions/doLogin');
const registerUser = require('../DBFunctions/registerUser')


let port = process.env.PORT || dbData.port;
let router = express.Router();

let mashupservices = express();
mashupservices.use(cors());

mashupservices.use(bodyParser.json());
mashupservices.use(bodyParser.urlencoded({extended: true}));

// app services
router.all('/mashupservices/registerUser',function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    registerUser(req, res, next);
})

router.all('/mashupservices/doLogin',function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    doLogin(req, res, next);
})

router.all('/mashupservices/sentOtpEmail',function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    sentOtpEmail(req, res, next);
})

router.all('/mashupservices/playTrack', function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    playTrack(req,res,next);
})

router.all('/mashupservices/getBanner', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    getBanner(req, res, next);
})

router.all('/mashupservices/getAlbums', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    getAlbum(req, res, next);
})

router.all('/mashupservices/getArtists', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    getArtists(req, res, next);
})

router.all('/mashupservices/getSongsList', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    getSongsList(req, res, next);
})

mashupservices.use("/",router);
mashupservices.listen(port);
console.log("Server running on port "+ port);