const express = require("express");
const goalController = require('../Controllers/GoalsController')


const router = express.Router();

//GetAllTrainers
router.get("/:clientId",goalController.getAllGoalsForClient)
router.post("/:clientId",goalController.CreateGoalForClient)
router.put("/:clientId/:goalId",goalController.UpdateGoalForClient)
router.delete("/:clientId/:goalId",goalController.DeleteGoalForClient)



module.exports = router;