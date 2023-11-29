const router = require("express").Router();
const createUser = require("../../../api/users/createUser");

router.post("/users", createUser);
module.exports = router;
