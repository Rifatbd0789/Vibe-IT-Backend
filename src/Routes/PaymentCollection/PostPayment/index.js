const router = require("express").Router();

const postPayment = require("../../../api/payments/postPayment");
router.post("/payments", postPayment);

module.exports = router;
