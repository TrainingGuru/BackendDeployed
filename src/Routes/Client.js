const express = require("express");
const clientController = require('../Controllers/ClientController')


const router = express.Router();


//router.get("/",clientController.getAllClients)
router.post("/Login",clientController.loginClient)
router.post("/Register",clientController.registerClient)
router.get("/:id/NutritionValue",clientController.getClientNutrition)
router.get("/Trainer/:trainerID/NutritionValues",clientController.getAllClientsAndNutritionForTrainer)
router.get("/:id",clientController.getOneClientsNotes)
router.get("/:id/StepGoal",clientController.getStepsGoal)
router.get("/:id/Name",clientController.getClientName)
router.get("/:id/FitbitToken",clientController.getClientFitbitToke)
router.put("/:id/FitbitToken",clientController.UpdateClientToken)
router.put("/:id/Description",clientController.UpdateClientDiscription)
router.put("/:id/Details",clientController.UpdateClientDetails)

module.exports = router;