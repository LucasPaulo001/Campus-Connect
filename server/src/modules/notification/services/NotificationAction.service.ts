import { NotificationRepository } from "../notificatioin.repository.js";

export async function MarkNotificationAsRead(notificationId: string, userId: string){
    const result = await NotificationRepository.markAsRead(notificationId, userId);

    if(result.matchedCount === 0){
        throw new Error("Notificação não encontrada ou já lida.");
    }

    return { msg: "Notificação marcada como lida." };

}