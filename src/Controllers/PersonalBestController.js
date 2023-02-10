
const PBs = require("../Models/PersonalBestModel");
const Exercise = require("../Models/ExerciseModel");

const GetLast3PBForClient = async (req,res) => {

    let pbList = await PBs.findAll({
        where : {
            ClientID : req.params.id
        },
        limit : 3, order: [['Date','DESC']],
        attributes : ['PersonalBest','LastPB'],
        include : {
            model : Exercise,
            attributes : ['Name']
        }
    });

    if(pbList <= 0 ){
        return res.status(404).json("No Personal Bests Found")
    }else{
        return res.status(200).json(pbList)
    }
}


module.exports = {

    GetLast3PBForClient,

}