const router = require("express").Router();
const storeWork = require("../../../api/works/storeWork");

router.post("/worksheet", storeWork);
module.exports = router;
