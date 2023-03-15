const express = require("express");
const clientWeightController = require('../Controllers/ClientWeightController')


const router = express.Router();

router.post("/:clientId",clientWeightController.addClientWeight);
router.get("/:clientId",clientWeightController.getAllRecordsOfAClientWeight);



module.exports = router;