import axiosInstace from "./axiosInstance";

// Login
export const login = async (email: string, password: string) => {
    const res = await axiosInstace.post("/api/auth/login", { email, password })
    return res.data
}

// Registro
export const register = async (data: any) => {
    const res = await axiosInstace.post("/api/auth/register", data)
    return res.data
}

// Perfil
export const profile = async () => {
    const res = await axiosInstace.get("/api/auth/profile");
    return res.data;
}

// Forgout password
export const forgoutPass = async(email: string) => {
    const res = await axiosInstace.post("/forgout/pass", { email });
    return res.data;
}

