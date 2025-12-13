import { authGuard } from "../../middlewares/AuthGuard.js";
import { CreateResponseChallengeController, FeedBackResponseController } from "./responseChallenge.controller.js";
import { Router } from "express";
const responseChallengeRouter = Router();


responseChallengeRouter.post("/response/challenge/:id", authGuard, CreateResponseChallengeController);
responseChallengeRouter.post("/response/:id/feedack", authGuard, FeedBackResponseController);


export default responseChallengeRouter;