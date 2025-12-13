import { UserRepository } from "../../users/user.repository.js";
import { NotificationRepository } from "../notificatioin.repository.js";

export async function ListNotificationsService(userId: string) {
    const user = await UserRepository.findById(userId)

    if (!user) throw new Error("Usuário não encontrado.");

    const [notifications, unreadCount] = await Promise.all([
        NotificationRepository.findByUser(userId),
        NotificationRepository.countUnread(userId)
    ]);

    return {
        notifications,
        unreadCount
    }
}