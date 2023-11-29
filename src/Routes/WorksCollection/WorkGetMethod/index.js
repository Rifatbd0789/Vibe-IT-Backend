const router = require("express").Router();
const showAllData = require("../../../api/works/showAllData");
const showForEmployee = require("../../../api/works/showForEmployee");

router.get("/progress/p", showAllData);
router.get("/worksheet/:email", showForEmployee);
module.exports = router;
