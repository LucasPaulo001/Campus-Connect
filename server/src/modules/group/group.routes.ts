import { authGuard } from "../../middlewares/AuthGuard.js";
import { CreateGroupController } from "./group.controller.js";
import { Router } from "express";
const groupRouter = Router();


groupRouter.post("/group", authGuard, CreateGroupController);


export default groupRouter;