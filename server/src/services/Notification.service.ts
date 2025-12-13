import { Types } from "mongoose";
import { NotificationRepository } from "../modules/notification/notificatioin.repository.js";
import { NotificationType } from "../@types/notification/notificatio.type.js";

export async function NotificationCreate(toUserId: Types.ObjectId, message: string, type: NotificationType) {
    // Criando notificação no banco

    const data = {
        user: toUserId,
        message: message,
        type: type
    }

    await NotificationRepository.create(data)
}