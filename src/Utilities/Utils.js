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
                    [Op.like] : Exercises[i].ExName
                }
            }
        })
        let exerciseID;
        let sets = Exercises[i].Sets;
        let reps = Exercises[i].Reps;

        if(DbExercise != null){
            exerciseID = DbExercise.ExerciseID
        }
        else{
            let newExercise = await Exercise.create({
                Name : Exercises[i].ExName,
                Type : "Weight"
            })

            exerciseID = newExercise.ExerciseID
        }
        AddExerciseToWorkout(exerciseID,TrainerWorkoutid,sets,reps);
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