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
        let nutrition = await Nutrition.findOne({
            where : {NutritionID : clientFromDB.NutritionID}
        })

        if(nutrition != null){
           await nutrition.update({
                TotalFats : req.body.TotalFats
            });
           return res.status(201).json(nutrition);
        }
        else{
            return res.status(404).json("No Nutrition Plan Found")
        }

    }
    else{
        return res.status(404).json("No User Found")
    }
}

const updateCarbsTotalTarget = async (req,res) =>{

}

const updateProteinTotalTarget = async (req,res) =>{

}

