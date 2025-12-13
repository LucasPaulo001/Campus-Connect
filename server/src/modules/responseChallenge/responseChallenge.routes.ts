import { authGuard } from "../../middlewares/AuthGuard.js";
import { CreateResponseChallengeController } from "./responseChallenge.controller.js";
import { Router } from "express";
const responseChallengeRouter = Router();


responseChallengeRouter.post("/response/challenge/:id", authGuard, CreateResponseChallengeController);


export default responseChallengeRouter;