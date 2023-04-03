const Exercise = require("../Models/ExerciseModel");
const { Op } = require("sequelize");
//Helpers

const AddExercises = async (TrainerWorkoutid,Exercises) => {

    for(let i = 0; i< Exercises.length; i++)
    {
        let DbExercise = await Exercise.findOne({
            where : {
                Name : {
                    [Op.like] : Exercises[i]
                }
            }
        })
        console.log(DbExercise);

    }
}

module.exports = {
    AddExercises
}