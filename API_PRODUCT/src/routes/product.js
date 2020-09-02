const express = require("express");
const router = express.Router();
const upload = require('../helper/upload');

const auth = require('../helper/authitentikasi');
// Destructur Method yg ada Controller
const {
  getAllCtr,
  getDetailCtr,
  insertCtr,
  updateCtr,
  deleteCtr,
  updatePatch
} = require("../controller/productController");

router

  .get("/getAll", auth, getAllCtr)
  .get("/getDetail/:id_product", getDetailCtr)
  .post("/insert", auth, upload.single('image'), insertCtr)
  .put("/update/:id_product", auth, upload.single('image'), updateCtr)
  .patch("/updatePatch/:id_product", upload.single('image'), updatePatch)
  .delete("/delete/:id_product", auth, deleteCtr);

module.exports = router;