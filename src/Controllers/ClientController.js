const Client = require("../Models/ClientModel");
const Trainer = require("../Models/TrainersModel");
const Nutrition = require("../Models/NutritionModel");

const getAllClients = async (req,res) =>{
    let clients = await Client.findAll()
    if(clients.length < 1){
        res.status(404)
        res.end()
    }
    else{
        res.status(200).send(clients)
        res.end();
    }
}


const loginClient = async (req, res) => {

    let clients = await Client.findOne({where : {
            Email: req.body.Email,
        }});

    if(!clients){
        res.status(404).send("No User found")
    }else if(clients.Password == req.body.Password){
        res.status(200).send("Login Details Valid")
    }else{
        res.status(401).send("Incorrect Password")
    }
}

const registerClient = async (req, res) => {

    let client = {
        TrainerID: req.body.TrainerID,
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password
    }
    let trainer = await Trainer.findOne({where : {
            TrainerID: client.TrainerID,
        }});

    console.log(trainer);

    if(trainer == null)
    {
        return res.status(404).json("No trainer found")
    }else {
        if (client.Name === ""  || client.Password === "" ||  client.Email === "") {
            return res.status(400).json({message: 'Missing information in Body'})
        } else {
            Client.create(client).then((clientToAdd) => res.status(201).send(clientToAdd)).catch((err) => {
                res.status(400).send(err);
            });
        }
    }
}

const getClientNutrition = async (req,res) => {

    let client = await Client.findOne({where : {
        ClientID : req.params.id
        }})

    if(client.NutritionID != null){
        let nutritionValue = await Nutrition.findOne({where : {
                NutritionID : client.NutritionID
            }});

        res.status(200).json(nutritionValue);
    }
    else{
        res.status(404).json("No Nutrition Plan Found")
    }

}




module.exports = {
    getAllClients,
    loginClient,
    registerClient,
    getClientNutrition
}