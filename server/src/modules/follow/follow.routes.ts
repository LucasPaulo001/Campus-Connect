import { authGuard } from "../../middlewares/AuthGuard.js";
import { FollowController, ListFollowsController } from "./follow.controller.js";
import { Router } from "express";
const followRouter = Router();


followRouter.post("/follow/user/:id", authGuard, FollowController);
followRouter.get("/user/followers", authGuard, ListFollowsController);


export default followRouter;