const router = require("express").Router();
const stripePayment = require("../../api/payments/stripePayment");
router.post("/create-payment-intent", stripePayment);

module.exports = router;
