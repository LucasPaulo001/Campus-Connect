import axiosInstance from "./axios/axiosInstance";

// Login
export const login = async (email: string, password: string) => {
    const res = await axiosInstance.post("/api/auth/login", { email, password })
    return res.data
}

// Registro
export const register = async (data: any) => {
    const res = await axiosInstance.post("/api/auth/register", data)
    return res.data
}

// Perfil
export const profile = async () => {
    const res = await axiosInstance.get("/api/auth/profile");
    return res.data;
}

// Forgout password
export const forgoutPass = async(email: string) => {
    const res = await axiosInstance.post("/forgout/pass", { email });
    return res.data;
}

// Logout
export const logout = async () => {
    const res = await axiosInstance.post("/api/logout");
    return res.data;
}

