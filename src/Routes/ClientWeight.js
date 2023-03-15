const express = require("express");
const clientWeightController = require('../Controllers/ClientWeightController')


const router = express.Router();

router.post("/:id",clientWeightController.addClientWeight)




module.exports = router;