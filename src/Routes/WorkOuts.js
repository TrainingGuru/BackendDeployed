const express = require("express");
const workoutController = require('../Controllers/WorkOutsController')


const router = express.Router();


router.get("/:id/WorkoutWeeks",workoutController.WorkOutWeeks);
router.get("/:id/Workouts/:wk",workoutController.GetWorkOutsForWeek);
router.get("/Workout/:id",workoutController.GetWorkOutDetails);
router.put("/CompleteWorkout/:id",workoutController.CompleteAWorkOut);
router.get("/:id/AllWorkouts",workoutController.GetAllWorkOutsForClient);
router.post("/:id/AssignWorkout",workoutController.AssignClientAWorkout);
router.get("/WorkoutNote/:id",workoutController.getNotesForOneClientWorkout); //ClientWorkoutID
router.get("/:id/WeightLifted/:wk",workoutController.TotalWeightLifted);
router.delete("/Workout/:id",workoutController.DeleteWorkout); //..../Client/Workout/workout ID



module.exports = router;