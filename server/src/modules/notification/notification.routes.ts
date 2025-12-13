import { authGuard } from "../../middlewares/AuthGuard.js";
import { ListNotificationsController, MarkNotificationAsReadController } from "./notification.controller.js";
import Router from "express";
const notificationRouter = Router();


notificationRouter.get("/notifications", authGuard, ListNotificationsController);
notificationRouter.patch("/notification/:id/read", authGuard, MarkNotificationAsReadController);


export default notificationRouter;