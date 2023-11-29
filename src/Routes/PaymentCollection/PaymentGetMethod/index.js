const router = require("express").Router();
const chartData = require("../../../api/payments/chartData");
const showPayData = require("../../../api/payments/showPayData");
// data to show on chart
router.get("/dashboard/details/:id", chartData);
// show payments data to web
router.get("/payments/:email", showPayData);

module.exports = router;
