import { Router } from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/", authMiddleware, roleMiddleware(ROLES.ADMIN), upload.single("image"), productController.create);
router.put("/:id", authMiddleware, roleMiddleware(ROLES.ADMIN), upload.single("image"), productController.update);
router.delete("/:id", authMiddleware, roleMiddleware(ROLES.ADMIN), productController.remove);

export default router;