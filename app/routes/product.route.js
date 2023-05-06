const express = require("express");
const products = require("../controllers/product.controller");
const router = express.Router();
router.route("/")
    .get(products.findAll)
    // .post(products.create)
    .delete(products.deleteAll);
router.route("/filterByName")
    .post(products.findByName)
    // .post(products.create)
    // .delete(products.deleteAll);
router.route("/admin/addproduct")
    // .get(products.findAll)
    .post(products.create);
// .delete(products.deleteAll);
router.route("/admin/FormEditProduct/:id")
    // .get(products.findAll)
    .get(products.findOne)
    .put(products.update);
// .delete(products.deleteAll);

router.route("/favorite")
    .get(products.findAllFavorite);

router.route("/:id")
    .get(products.findOne)
    .put(products.update)
    .delete(products.delete);

module.exports = router;
