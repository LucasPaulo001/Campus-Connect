import { Router } from "express";
import { authGuard } from "../../middlewares/AuthGuard.js";
import { CreateResponseController, DeleteResponseController, EditResponseController, LikeResponsesController, ListResponsesController } from "./response.controller.js";
const responseRouter = Router();


responseRouter.post("/response/comment/:id", authGuard, CreateResponseController);
responseRouter.delete("/response/:id", authGuard, DeleteResponseController);
responseRouter.patch("/response/edit/:id", authGuard, EditResponseController);
responseRouter.post("/response/like/:id", authGuard, LikeResponsesController);
responseRouter.get("/responses/comment/:id", authGuard, ListResponsesController);


export default responseRouter;