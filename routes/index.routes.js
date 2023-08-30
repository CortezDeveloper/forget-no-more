const express = require("express");
const router = express.Router();

// router.get("/", (req, res, next) => {
//   res.json("All good in here");
// });

router.use("/user", require("./user.routes"))
router.use("/products", require("./products.routes"))
router.use("/favourites", require("./favouritesProducts.routes"))
// router.use("/createproducts", require("./createproduct.routes") )

module.exports = router;
