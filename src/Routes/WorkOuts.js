const express = require("express");
const workoutController = require('../Controllers/WorkOutsController')


const router = express.Router();


router.get("/:id/WorkoutWeeks",workoutController.WorkOutWeeks);
router.get("/:id/Workouts/:wk",workoutController.GetWorkOutsForWeek);
router.get("/Workout/:id",workoutController.GetWorkOutDetails);
router.put("/CompleteWorkout/:id",workoutController.CompleteAWorkOut);


module.exports = router;