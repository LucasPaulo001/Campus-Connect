import { authGuard } from "../../middlewares/AuthGuard.js";
import { BecomeTeacherController } from "./teacher.controller.js";
import { Router } from "express";

const teacherRouter = Router();

teacherRouter.post("/teacher", authGuard, BecomeTeacherController);

export default teacherRouter;
