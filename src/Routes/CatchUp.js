const express = require("express");
const catchUpController = require('../Controllers/CatchUpController')


const router = express.Router();

router.post("/:clientId",catchUpController.scheduleCatchUp)


module.exports = router;