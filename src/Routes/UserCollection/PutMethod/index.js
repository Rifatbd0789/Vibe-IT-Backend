const router = require("express").Router();
const fireUser = require("../../../api/users/fireUser");
const makeHR = require("../../../api/users/makeHR");
const verifyEmployee = require("../../../api/users/verifyEmployee");
// Fire an user as admin
router.put("/users/fire/:email", fireUser);
// make employee to HR
router.put("/user/:email", makeHR);
// verify the employee
router.put("/users/:email", verifyEmployee);
module.exports = router;
