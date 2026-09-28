import express from "express";
import mongoose from "mongoose";

import {
  createProductsController,
  deleteProductController,
  listAllProducts,
  myProductController,
  updateProductController,
} from "../controller/products.controller.js";
import { createProductValidator } from "../validator/product.validators.js";
import multer from "multer";
import { authenticat } from "../middelware/authenticat.js";
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 1 * 1024 * 1024, // 1MB
  },
});

router.post(
  "/",
  authenticat,
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "user is not authorize to create products",
      });
    }
    next();
  },
  upload.array("images"),

  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
    next();
  },
  createProductValidator,
  createProductsController,
);
// get all products for user
router.get("/", authenticat, 
  //check the role is user or not
  (req, res, next) => {
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "user is not uthorized",
      });
    }
    next();

},listAllProducts);

//my Product list
router.get("/my-products",authenticat,
  //check the role is seller or not
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "user is not uthorized",
      });
    }
    next();
  },myProductController)

router.put(
  "/:id",
  authenticat,
  //check the role is seller or not
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "user is not authorize to update product",
      });
    }
    next();
  },
  //product id validation
   (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    next();
  },

  upload.array("images"),

  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
    next();
  },
  createProductValidator,
  updateProductController,
);

router.delete("/:id",authenticat, 
  //check the role is seller or not
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "user is not authorize to delete product",
      });
    }
    next();
  },
  //product id validation
   (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    next();
  },deleteProductController)

export default router;
