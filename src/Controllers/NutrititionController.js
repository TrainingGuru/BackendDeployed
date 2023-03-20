const Nutrition = require("../Models/NutritionModel");
const Client = require("../Models/ClientModel");
const NutritionHistory = require("../Models/NutritionHistoryModel")

const updateCaloriesTotalTarget = async (req,res) =>{
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
                TotalCalories : req.body.TotalCalories
            });
            return res.status(204).json(nutrition);
        }
        else{
            return res.status(404).json("No Nutrition Plan Found")
        }

    }
    else{
        return res.status(404).json("No User Found")
    }
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
            return res.status(204).json(nutrition);
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
                TotalCarbohydrates : req.body.TotalCarbohydrates
            });
            return res.status(204).json(nutrition);
        }
        else{
            return res.status(404).json("No Nutrition Plan Found")
        }

    }
    else{
        return res.status(404).json("No User Found")
    }
}

const updateProteinTotalTarget = async (req,res) =>{
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
                TotalProtein : req.body.TotalProtein
            });
            return res.status(204).json(nutrition);
        }
        else{
            return res.status(404).json("No Nutrition Plan Found")
        }

    }
    else{
        return res.status(404).json("No User Found")
    }
}

const updateClientIntake = async (req, res) => {
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
                CaloriesIntake: req.body.CaloriesIntake,
                FatsIntake: req.body.FatsIntake,
                ProteinIntake: req.body.ProteinIntake,
                CarbohydratesIntake: req.body.CarbohydratesIntake
            });
            let boundary = (nutrition.TotalCalories /100) * 5;
            let lowerBoundary = nutrition.TotalCalories - boundary;
            let uperBoundary = nutrition.TotalCalories + boundary;


            if(req.body.CaloriesIntake < uperBoundary && req.body.CaloriesIntake > lowerBoundary){
                let todayDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
                let nutritionHistory = await NutritionHistory.findOne({
                    where : {
                        ClientID : req.params.id,
                        Date : todayDate,
                    }
                });

                if(nutritionHistory == null){
                    let newNutritionHistory = {
                        ClientID : req.params.id,
                        Date : todayDate,
                        CaloriesHit : 1
                    }
                    NutritionHistory.create(newNutritionHistory);

                }else{
                    nutritionHistory.update({
                        CaloriesHit : 1
                    });
                }
            }
            else{
                let todayDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
                let nutritionHistory = await NutritionHistory.findOne({
                    where : {
                        ClientID : req.params.id,
                        Date : todayDate,
                    }
                });

                if(nutritionHistory == null){
                    let newNutritionHistory = {
                        ClientID : req.params.id,
                        Date : todayDate,
                        CaloriesHit : 0
                    }
                    NutritionHistory.create(newNutritionHistory);

                }else{
                    nutritionHistory.update({
                        CaloriesHit : 0
                    });
                }
            }
            return res.status(204).json(nutrition);
        }
        else{
            return res.status(404).json("No Nutrition Plan Found")
        }

    }
    else{
        return res.status(404).json("No User Found")
    }
}

const updateStepsGoal = async (req,res) =>{
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
                StepsGoal : req.body.StepsGoal
            });
            return res.status(204).json(nutrition);
        }
        else{
            return res.status(404).json("No Steps Gaol Found")
        }

    }
    else{
        return res.status(404).json("No User Found")
    }
}

module.exports = {
    updateCaloriesTotalTarget,
    updateProteinTotalTarget,
    updateFatsTotalTarget,
    updateCarbsTotalTarget,
    updateClientIntake,
    updateStepsGoal
}