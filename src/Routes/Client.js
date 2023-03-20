const express = require("express");
const clientController = require('../Controllers/ClientController')


const router = express.Router();


router.get("/",clientController.getAllClients)
router.post("/Login",clientController.loginClient)
router.post("/Register",clientController.registerClient)
router.get("/:id/NutritionValue",clientController.getClientNutrition)
router.get("/Trainer/:trainerID/NutritionValues",clientController.getAllClientsAndNutritionForTrainer)
router.get("/:id",clientController.getOneClientsNotes)
router.get("/:id/StepGoal",clientController.getStepsGoal)


module.exports = router;