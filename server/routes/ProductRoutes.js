// Import Packages
const express = require("express");
const multer = require("multer");

// Import Controller
const ProductController = require("../controllers/ProductController");

// multer middlewares
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "/../uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
let upload = multer({
  storage: storage,
}).single("image");

// Declare Router
const router = express.Router();

// Routes
router.route("/").get(ProductController.getAllProduct);
router.route("/:admin").get(ProductController.getAllProductAdmin);

router.route("/:id").get(ProductController.getProductById);


router.route("/").post(upload, ProductController.createProduct);

router.route("/:id").delete(ProductController.deleteProductById);

router.route("/:id").patch(ProductController.updateProductById);

router.route("/search/:index").get(ProductController.searchProduct);

router.route("/dSearch/:index").get(ProductController.detailedSearchProduct);

router.route("/search/category/:index").get(ProductController.searchProductByCategory);

module.exports = router;
