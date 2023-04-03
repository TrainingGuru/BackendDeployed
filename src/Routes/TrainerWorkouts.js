const express = require("express");
const workoutController = require('../Controllers/WorkOutsController')


const router = express.Router();


router.get("/:id/AllWorkouts",workoutController.getAllWorksForTrainer);
router.post("/TrainerWorkout",workoutController.CreateAWorkout);



module.exports = router;