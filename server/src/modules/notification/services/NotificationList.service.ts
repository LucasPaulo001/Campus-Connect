import { UserRepository } from "../../users/user.repository.js";
import { NotificationRepository } from "../notificatioin.repository.js";

export async function ListNotificationsService(userId: string) {
    const user = await UserRepository.findById(userId)

    if (!user) throw new Error("Usuário não encontrado.");

    const [notifications, unreadCount] = await Promise.all([
        NotificationRepository.findByUser(userId),
        NotificationRepository.countUnread(userId)
    ]);

    const notificationsList = notifications.map((n: any) => ({
        id: n._id,
        message: n.message,
        user: {
            id: n.user._id,
            name: n.user.name,
            role: n.user.role
        }
    }))

    return {
        notificationsList,
        unreadCount
    }
}