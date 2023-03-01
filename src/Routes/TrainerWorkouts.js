const express = require("express");
const workoutController = require('../Controllers/WorkOutsController')


const router = express.Router();


router.get("/:id/AllWorkouts");



module.exports = router;