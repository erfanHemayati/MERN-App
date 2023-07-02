import express from "express";
const router = express.Router()
import { getFeedPosts, getUserPosts, likeposts } from "../controllers/post.js"
import { verifyToken } from "../middleware/auth.js";

router.get("/getPost", verifyToken, getFeedPosts);
router.get("/:pid/getUserPost", verifyToken ,getUserPosts);
router.patch("/:pid/like",verifyToken, likeposts);

 export default router;

