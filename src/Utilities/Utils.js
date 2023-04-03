const Exercise = require("../Models/ExerciseModel");
const Workout = require("../Models/WorkOutModel");
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
        let exerciseID;
        if(DbExercise != null){
            exerciseID = DbExercise.ExerciseID
        }else{
            let newExercise = await Exercise.create({
                Name : Exercises[i],
                Type : "Weight"
            })

            exerciseID = newExercise.ExerciseID

        }




    }
}

const AddExerciseToWorkout = async (exerciseID,TrainerWorkoutid,Sets,Reps) => {
    let AddExercise = await Workout.create({
        ExerciseID : exerciseID,
        TrainerWorkoutID : TrainerWorkoutid,
        Sets : Sets,
        Reps : Reps
    })
}

module.exports = {
    AddExercises
}