const express = require("express");
const account = require("../controllers/account.controller");
const router = express.Router();
router.route("/register")
    // .get(products.findAll)
    .post(account.createAccount);
    // .delete(products.deleteAll);

router.route("/login")
    .post(account.loginAccount);

// router.route("/:id")
//     .get(products.findOne)
//     .put(products.update)
//     .delete(products.delete);

module.exports = router;