const Client = require("../Models/ClientModel");
const Trainer = require("../Models/TrainersModel");
const Nutrition = require("../Models/NutritionModel");
const bcrypt = require("bcryptjs");
const SendEmail = require("../Utilities/EmailSender");





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
// const getAllClients = async (req,res) =>{
//     let clients = await Weight.findAll()
//     if(clients.length < 1){
//         res.status(404)
//         res.end()
//     }
//     else{
//         res.status(200).send(clients)
//         res.end();
//     }
// }


const loginClient = async (req, res) => {

    let clients = await Client.findOne({where : {
            Email: req.body.Email,
        }});

    if(!clients){
        res.status(404).send("No User found")
    }else{
        bcrypt.compare(req.body.Password,clients.Password, (err, comparePW) => {
            if(err){
                res.status(502).json({message: "error while checking user password"});
            }
            else if( comparePW)
            {
                res.status(200).json({ClientID : clients.ClientID});
            }
            else
            {
                res.status(401).send("Incorrect Password")
            }
        })
    }
}

const registerClient = async (req, res) => {

    let trainer = await Trainer.findOne({where : {
            TrainerID: req.body.TrainerID,
        }});

    if(trainer == null)
    {
        return res.status(404).json("No trainer found")
    }
    else {
        let clientFromDB = await Client.findOne({where : { Email : req.body.Email}});

        if(clientFromDB != null)
        {
            res.status(409).json({message: 'User Email Already Used'});
        }
        else if (req.body.Name === ""  || req.body.Password === "" ||  req.body.Email === "")
        {
            return res.status(400).json({message: 'Missing information in Body'})
        }
        else
        {
            let nutritionPlan = {
                "TotalCalories": 0,
                "TotalFats": 0,
                "TotalProtein": 0,
                "TotalCarbohydrates": 0,
                "CaloriesIntake": 0,
                "FatsIntake": 0,
                "ProteinIntake": 0,
                "CarbohydratesIntake": 0
            }

            let nutritionPlanID
            await Nutrition.create(nutritionPlan).then((nutritionAdded) =>
                nutritionPlanID = nutritionAdded.NutritionID)

            bcrypt.hash(req.body.Password,12, (err, hashedPassword) => {
                if (err) {
                    console.log('Cannot encrypt');
                    return res.status(500).json({message: "Could not hash the password"});
                } else if (hashedPassword) {
                    let client = {
                        TrainerID: req.body.TrainerID,
                        Name: req.body.Name,
                        Email: req.body.Email,
                        Password: hashedPassword,
                        NutritionID: nutritionPlanID
                    }

                    SendEmail.NewClientRegisterEmail(client.Email,client.Name,req.body.Password,trainer.Name)
                    Client.create(client).then((clientToAdd) =>
                        res.status(201).send(clientToAdd)).catch((err) => {
                        res.status(400).send(err);
                    });
                }
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
//Returns all clients for a certain trainer and their nutrition
const getAllClientsAndNutritionForTrainer  = async (req,res) => {

    let clients = await Client.findAll({
        where : {
            TrainerID : req.params.trainerID
        },
        attributes : ['Name'],

        include:{
            model : Nutrition,
            attributes : ['TotalCalories','CaloriesIntake']
        }
    });

    if(clients == null || clients.length <= 0 ){
        return res.status(404).json(`No Clients found for Trainer ${req.params.trainerID}`);
    }else{
        return res.status(200).json(clients);
    }
}

const getOneClientsNotes  = async (req,res) => {

    let client = await Client.findOne({
        where : {
            ClientID : req.params.id
        },
        attributes : ['Name','Notes'],

    });

    if(client == null || client.length <= 0 ){
        return res.status(404).json(`No Client found for ID of  ${req.params.id}`);
    }else{
        return res.status(200).json(client);
    }
}

const getStepsGoal = async (req,res) =>{
    let client = await Client.findOne({where : {
            ClientID : req.params.id
        }})

    if(client.NutritionID != null){
        let nutritionValue = await Nutrition.findOne({
            where : {
                NutritionID : client.NutritionID
            },
            attributes : ['StepsGoal']
        });

        res.status(200).json(nutritionValue);
    }
    else{
        res.status(404).json("No Nutrition Plan Found")
    }

}

const getClientName = async (req,res) =>{
    let client = await Client.findOne({where : {
            ClientID : req.params.id
        },
        attributes : ['Name']
    })

    if(client != null || client.length > 0){
        res.status(200).json(client);
    }
    else{
        res.status(404).json("No Client Found")
    }
}
const getClientFitbitToke = async (req,res) =>{
    let client = await Client.findOne({where : {
            ClientID : req.params.id
        },
        attributes : ['FitbitToken','TokenDate']
    })

    if(client != null || client.length > 0){
        res.status(200).json(client);
    }
    else{
        res.status(404).json("No Client Found")
    }
}

const UpdateClientToken = async (req, res) => {

    let todayDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    Client.findOne({
        where: {
            ClientID : req.params.id
        }
    }).then(recordToUpdate => {

        if(!recordToUpdate)
            res.status(404).json("No Client Found")

        else{
            recordToUpdate.update({
                FitbitToken : req.body.FitbitToken,
                TokenDate : todayDate
            });
            res.status(201).json("Token Updated");
        }

    })
}

const UpdateClientDiscription = async (req, res) => {

    Client.findOne({
        where: {
            ClientID : req.params.id
        }
    }).then(recordToUpdate => {

        if(!recordToUpdate)
            res.status(404).json("No Client Found")

        else{
            recordToUpdate.update({
                Notes : req.body.Description,
            });
            res.status(201).json("Description Updated");
        }

    })
}
const UpdateClientDetails = async (req, res) => {


    Client.findOne({
        where: {
            ClientID : req.params.id
        }
    }).then(recordToUpdate => {

        if(!recordToUpdate)
            res.status(404).json("No Client Found")

        else{
            recordToUpdate.update({
                Name : req.body.Name,
                Email : req.body.Email
            });
            res.status(201).json("Client Updated");
        }

    })
}



module.exports = {
    getAllClients,
    loginClient,
    registerClient,
    getClientNutrition,
    getAllClientsAndNutritionForTrainer,
    getOneClientsNotes,
    getStepsGoal,
    getClientName,
    getClientFitbitToke,
    UpdateClientToken,
    UpdateClientDiscription,
    UpdateClientDetails
}

