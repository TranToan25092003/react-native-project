const express = require("express");
const router = express.Router();

const notificeController = require("../../controllers/system/Notifice.controller");

router.get("/:id/get", notificeController.getNotifice);

module.exports = router;
