import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
} from "../controllers/productsController.js";
import { celebrate } from "celebrate";
import {
  createProductSchema,
  editProductSchema,
  productIdSchema,
} from "../validations/productsValidation.js";

const router = Router();

router.get("/", getProducts);
router.post("/", celebrate(createProductSchema), createProduct);
router.patch("/:id", celebrate(editProductSchema), editProduct);
router.delete("/:id", celebrate(productIdSchema), deleteProduct);
router.get("/:id", celebrate(productIdSchema), getProductById);

export default router;
