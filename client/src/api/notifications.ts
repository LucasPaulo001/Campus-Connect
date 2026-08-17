import axiosInstance from "./axios/axiosInstance";

export const loadNotifications = async () => {
    const res = await axiosInstance.get("/api/notifications");

    return res.data;
}

export const markNotificationAsReadAPI = async (notificationId: string) => {
    const res = await axiosInstance.patch(`/api/notification/${notificationId}/read`, {});

    return res.data;
}