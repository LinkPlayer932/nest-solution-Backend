import express from "express";
import upload from "../middleware/upload.js";
import { 
  createArticle, 
  getArticles, 
  getArticle, 
  updateArticle, 
  deleteArticle 
} from "../controllers/articleController.js";

const router = express.Router();

router.post("/", upload.single("image"), createArticle);
router.get("/", getArticles);
router.get("/:id", getArticle);
router.put("/:id", upload.single("image"), updateArticle);
router.delete("/:id", deleteArticle);

export default router;
