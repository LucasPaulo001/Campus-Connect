import { authGuard } from "../../middlewares/AuthGuard.js";
import { CreateResponseChallengeController, FeedBackResponseController, ListResponseChallengeController } from "./responseChallenge.controller.js";
import { Router } from "express";
const responseChallengeRouter = Router();


responseChallengeRouter.post("/response/challenge/:id", authGuard, CreateResponseChallengeController);
responseChallengeRouter.post("/response/:id/feedback", authGuard, FeedBackResponseController);
responseChallengeRouter.get("/challenge/:id/response", authGuard, ListResponseChallengeController)


export default responseChallengeRouter;