const express = require("express");
const nutritionController = require('../Controllers/NutrititionController')


const router = express.Router();

//client id - Updates the total Fat Total Target
router.put("/:id/FatTotal")



module.exports = router;