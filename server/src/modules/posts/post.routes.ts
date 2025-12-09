import { authGuard } from "../../middlewares/AuthGuard.js";
import { AuthRole } from "../../middlewares/AuthRole.js";
import { CreatePostController, DeletePostController, ListAuthorPostsController } from "./post.controller.js";
import { ListAllPostController } from "./post.controller.js";
import { Router } from "express";
const postRouter = Router();

postRouter.post(
  "/post",
  authGuard,
  AuthRole("professor"),
  CreatePostController
);
postRouter.get("/post", authGuard, ListAllPostController);
postRouter.delete("/post/:id", authGuard, DeletePostController);
postRouter.get("/post/author", authGuard, ListAuthorPostsController);

export default postRouter;
