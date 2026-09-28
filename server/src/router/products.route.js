import { Router } from "express";
import { authentication } from "../middleware/auth.middle.js";
import upload from "../config/multer.js";
import {
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  productCreate,
  updateProduct,
  userProduct,
} from "../controller/product.controller.js";
import { productCreateValidator } from "../validation/product.valid.js";

const productRouter = Router();

productRouter.post(
  "/create",
  authentication,
  upload.array("images"),
  (req, res, next) => {
    if (req.body?.sizes) {
      try {
        const sizes = JSON.parse(req.body.sizes);
        req.body.sizes = sizes;
        next();
      } catch (error) {
        return res.status(400).json({
          message: "sizes must be an array",
        });
      }
    } else {
      return res.status(400).json({
        message: "Sizes are required",
      });
    }
  },
  productCreateValidator,
  productCreate,
);

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getSingleProduct);
productRouter.delete("/:id", authentication, deleteProduct);
productRouter.put(
  "/:id",
  authentication,
  upload.array("newImages"),
  (req, res, next) => {
    console.log(req.body)
    if (req.body?.sizes) {
      try {
        const sizes = JSON.parse(req.body.sizes);
        req.body.sizes = sizes;
        next();
      } catch (error) {
        return res.status(400).json({
          message: "sizes must be an array",
        });
      }
    } else {
      return res.status(400).json({
        message: "Sizes are required",
      });
    }
  },
  productCreateValidator,
  updateProduct,
);

productRouter.get('/user/userProduct' , authentication , userProduct)
export default productRouter;
