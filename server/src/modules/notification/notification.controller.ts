import { Response } from "express";
import { CustomRequest } from "../../middlewares/AuthGuard.js";
import { ListNotificationsService } from "./services/NotificationList.service.js";
import { MarkNotificationAsRead } from "./services/NotificationAction.service.js";

export async function ListNotificationsController(req: CustomRequest, res: Response){
    try{
        const userId = req.user._id;

        const result = await ListNotificationsService(userId);

        res.status(200).json({ notification: result.notificationsList, unreadCount: result.unreadCount })
    }
    catch(err: any){
        res.status(500).json({error: "Erro interno do servidor.", err: err});
    }
}

export async function MarkNotificationAsReadController(
  req: CustomRequest,
  res: Response
) {
  const userId = req.user._id;
  const { id } = req.params;

  const result = await MarkNotificationAsRead(userId, id);

  res.json(result);
}