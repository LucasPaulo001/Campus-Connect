import axiosInstace from "./axiosInstance";

export const loadNotifications = async (token: string) => {
    const res = await axiosInstace.get("/api/notifications", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
}

export const markNotificationAsReadAPI = async (token: string, notificationId: string) => {
    const res = await axiosInstace.patch(`/api/notification/${notificationId}/read`, {}, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return res.data;
}