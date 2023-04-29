const express = require("express");
const trainerController = require('../Controllers/TrainerController');


const router = express.Router();


router.get("/",trainerController.getAllTrainers)
router.post("/Register",trainerController.registerTrainer)
router.post("/Login",trainerController.loginTrainer)
router.get("/:id/Clients",trainerController.getAllClientsForTrainer)
router.get("/:id/UpComingWorkouts",trainerController.GetUpcomingWorkOut)
router.get("/:id/UpcomingMeetings",trainerController.getUpComingMeetingForTrainer)
router.get("/:id",trainerController.getOneTrainerByID)

module.exports = router;