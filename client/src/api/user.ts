import axiosInstace from "./axiosInstance";

// Editar dados do perfil
export const EditData = async (
  name: string | undefined,
  name_user: string | undefined,
  bio: string,
  token: string
) => {
  const res = await axiosInstace.patch(
    "/api/profile",
    {
      name,
      name_user,
      bio,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// Solicitar categoria de professor
export const BecomeTeacher = async (token: string, formation: string, departament: string) => {
  const res = await axiosInstace.post("/api/become/teacher", 
    {
      formation,
      departament
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
}

