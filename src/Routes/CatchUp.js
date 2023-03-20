const express = require("express");
const catchUpController = require('../Controllers/CatchUpController')


const router = express.Router();

router.post("/:clientId",catchUpController.scheduleCatchUp);
router.put("/:catchUpID",catchUpController.submitCatchUp);
router.get("/:id",catchUpController.getCatchUpSummary);
router.get("/:id/Notes",catchUpController.getCatchUpNotes);

module.exports = router;