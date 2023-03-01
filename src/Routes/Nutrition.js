const express = require("express");
const nutritionController = require('../Controllers/NutrititionController')


const router = express.Router();

//client id - Updates the total Fat Total Target
router.put("/:id/FatTotal",nutritionController.updateFatsTotalTarget);
router.put("/:id/CaloriesTotal",nutritionController.updateCaloriesTotalTarget);
router.put("/:id/ProteinTotal",nutritionController.updateProteinTotalTarget);
router.put("/:id/CarbsTotal",nutritionController.updateCarbsTotalTarget);
router.put("/:id/Intake",nutritionController.updateClientIntake);


module.exports = router;