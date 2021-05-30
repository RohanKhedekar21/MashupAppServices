// const { response } = require("express");
const getAllModelsFromRequest = require("../DBConnection/getAllModelsFromRequest");

const doLogin = async function(req, res, next) {
    console.log("Inside doLogin")
    console.log("req.body",req.body);

    const { email, password, otp } = req.body

    const allModels = await getAllModelsFromRequest(req, "Mashup");

    const usersModel = allModels.usersModel;

    const errorText = []
    let response = {}
    let queryString = {
        email: email,
        password: password
    }
    let projectString = {
        _id: 0,
        userId: 1,
        email: 1,
        password: 1
    }

    await usersModel.find(queryString,projectString).exec(function(err, userData){
        if(err){
            errorText.push('Error in user profile access for give email Id')
            res.status(422)
            response = { code: 'DATABASE ERROR', message: errorText, errors: []}
            res.json(response)
        }else {
            console.log("userData",userData)
            if(userData.length <= 0 ){
                errorText.push("Email Id is not registered");
                response = { code: 'Email ERROR', message: errorText, errors: []}
                res.json(response)    
            }else{
                res.json(userData[0]);
            }
        }
    })


}

module.exports = doLogin