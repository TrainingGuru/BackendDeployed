const Nutrition = require("../Models/NutritionModel")
const Client = require("../Models/ClientModel");

const updateCaloriesTotalTarget = async (req,res) =>{

}

const updateFatsTotalTarget = async (req,res) =>{
    let clientFromDB = await Client.findOne({
        where : {
            ClientID : req.params.id
        }});

    if(clientFromDB != null)
    {

    }
    else{
        return res.status(404).json("No User Found")
    }
}

const updateCarbsTotalTarget = async (req,res) =>{

}

const updateProteinTotalTarget = async (req,res) =>{

}