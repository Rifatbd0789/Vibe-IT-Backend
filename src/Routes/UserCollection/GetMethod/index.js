const router = require("express").Router();

const loadAllUser = require("../../../api/users/loadAllUser");
const checkUserRole = require("../../../api/users/checkUserRole");
const checkUserFire = require("../../../api/users/checkUserFire");
const getTheNameEmployee = require("../../../api/users/getTheNameEmployee");
const loadAllUsers = require("../../../api/users/loadAllUsers");
const loadSpecificUser = require("../../../api/users/loadSpecificUser");

router.get("/employee", loadAllUser);
// check for HR, admin and employee
router.get("/users/hr/:email", checkUserRole);
// check the user fire or not when login
router.get("/users/login/:email", checkUserFire);
// to get the name of every employee
router.get("/progress/name", getTheNameEmployee);
// load all user info to ui for admin
router.get("/users", loadAllUsers);
// load specific user
router.get("/users/:id", loadSpecificUser);
module.exports = router;
