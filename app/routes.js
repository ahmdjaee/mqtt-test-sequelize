const express = require("express");
const controller = require("./controller");
const router = express.Router();

// Get latest data for all devices
router.get("/latest", controller.getLatestDevice);

// Get history data
router.get("/history", controller.getHistoryDevice);

// Get average data
router.get("/average", controller.getAverageDevice);

module.exports = router;
