const express = require("express");
const payment = require("../controllers/payment.controller");
const router = express.Router();
router.route("/")
    // .get(payment.findOrderByEmail)
    .post(payment.createOrder);
// .delete(products.deleteAll);


router.route("/cancleOrder")
    // .get(payment.findOrderByEmail)
    .post(payment.cancleOrder);

router.route("/admin/updateOrder")
    .get(payment.findAll)
    .put(payment.updateOrder);
router.route("/admin/updateOrder/filterbydate")
    .post(payment.showOrderFilterByDate);

router.route("/:email")
    // .get(payment.findOrderByEmail)
    .get(payment.findOrderByEmail);
// router.route("/:id")
//     .get(products.findOne)
//     .put(products.update)
//     .delete(products.delete);

module.exports = router;