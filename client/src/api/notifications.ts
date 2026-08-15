import axiosInstace from "./axiosInstance";

export const loadNotifications = async () => {
    const res = await axiosInstace.get("/api/notifications");

    return res.data;
}

export const markNotificationAsReadAPI = async (notificationId: string) => {
    const res = await axiosInstace.patch(`/api/notification/${notificationId}/read`, {});

    return res.data;
}