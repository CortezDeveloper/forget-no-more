const express = require("express");
const router = express.Router();

// router.get("/", (req, res, next) => {
//   res.json("All good in here");
// });

router.use("/user", require("./user.routes"))
router.use("/products", require("./products.routes"))

module.exports = router;
