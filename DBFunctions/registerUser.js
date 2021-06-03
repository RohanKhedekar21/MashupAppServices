const dbName = require("../DBConnection/dbName")
const getAllModelsFromRequest = require("../DBConnection/getAllModelsFromRequest")
const {v4 : uuidv4} = require('uuid')

const registerUser = async function(req, res, next) {
    console.log("Inside registerUser",req.body)

    const { email, password } = req.body

    const allModels = await getAllModelsFromRequest(req, dbName)

    const usersModel = allModels.usersModel;

    const errorText = []
    let response = {}
    let queryString = {
        email: email,
        password: password
    }
    let projectString = {

    }

    await usersModel.find(queryString).exec(async function(err, userData){
        if(err){
            errorText.push("Error in user profile access")
            res.status(422);
            response = { code: "DATABASE ERROR", message: errorText}
            res.json(response);
        }else{
            if(userData.length > 0){
                errorText.push("Email Id already registered")
                response = { code: "Email ERROR", message: ["Email id already registered"] }
                res.json(response)
            }else{
                let id = "UI"+uuidv4()
                let doc = {
                    userId: id,
                    email: email,
                    password: password
                }
                let docToSave = new usersModel(doc)
                await docToSave.save()
                res.json({"status": "success",userData: doc})
            }
        }
    })
}

module.exports = registerUser