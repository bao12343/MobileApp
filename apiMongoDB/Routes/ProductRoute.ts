//import express, { Request, Response } from "express";
import express from "express";
import multer from "multer";
import path from "path";
import {
  createProduct,
  getAllProducts,
  getProductByCatID,
  getProductByID,
} from "../Controllers";
const router = express.Router();
const imagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.name + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const images = multer({ storage: imagesStorage }).array("images");

router.post("/createProduct", images, createProduct);
router.get("/getProductByCatID/:CatID", getProductByCatID);
router.get("/getProductByID/:id", getProductByID);
router.get("/getAllProducts", getAllProducts);
// router.get('/filterProducts', getProductByName)
export { router as ProductRoute };