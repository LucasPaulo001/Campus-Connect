import { NotificationModel } from "./notification.model.js";
import { TNotification } from "../../@types/notification/notificatio.type.js";

export const NotificationRepository = {
    create(data: TNotification) {
        return NotificationModel.create(data);
    },

    findByUser(userId: string | undefined, limit = 20) {
        return NotificationModel
            .find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate("user")
            .select("-password")
    },

    countUnread(userId: string | undefined) {
        return NotificationModel.countDocuments({
            user: userId,
            readAt: null
        });
    },

    markAsRead(notificationId: string, userId: string | undefined) {
        return NotificationModel.updateOne({
            _id: notificationId,
            user: userId,
            readAt: null
        },
        {
            readAt: new Date()
        })
    }


}