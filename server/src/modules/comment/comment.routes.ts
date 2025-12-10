import { authGuard } from "../../middlewares/AuthGuard.js";
import { CreateCommentController, DeleteCommentController, EditCommentController, LikeCommentController, ListCommentsByPostController } from "./comment.controller.js";
import { Router } from "express";
const commentRouter = Router();


commentRouter.post("/comment/post/:id", authGuard, CreateCommentController);
commentRouter.delete("/comment/:id", authGuard, DeleteCommentController);
commentRouter.patch("/comment/:id", authGuard, EditCommentController);
commentRouter.post("/comment/like/:id", authGuard, LikeCommentController);
commentRouter.get("/comment/post/:id", authGuard, ListCommentsByPostController);


export default commentRouter;