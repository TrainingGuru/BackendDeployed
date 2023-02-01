const express = require("express");
const clientController = require('../Controllers/ClientController')


const router = express.Router();

//GetAllTrainers
router.get("/",clientController.getAllClients)
router.get("/Login",clientController.loginClient)
router.post("/Register",clientController.registerClient)
router.get("/:id/NutritionValue",clientController.getClientNutrition)


module.exports = router;