const NutritionHistory = require("../Models/NutritionHistoryModel");


const getCalorieHistory = async (req,res) =>{

    let history = await NutritionHistory.findAll({
        where : {
            ClientID : req.params.id
        },
        order: [
            ['Date','ASC'],
        ],
        attributes : ['Date','CaloriesHit']
    });

    if(history.length <= 0 || history == null){
        return res.status(404).json("No History Of Calories Found");
    }else{
        return res.status(200).json(history);
    }
}

module.exports = {
    getCalorieHistory
}