import { IUser } from "@/types";
import axiosInstace from "./axios/axiosInstance";

export interface DTOEditProfile {
  name?: string;
  nameUser?: string;
  biography?: string;
  avatarUrl?: string;
}

// Editar dados do perfil
export const EditData = async (
  updates: DTOEditProfile,
) => {
  const res = await axiosInstace.patch(
    "/api/auth/profile-edit",

    updates

  );

  return res.data;
};

// Solicitar categoria de professor
export const BecomeTeacher = async (formation: string, departament: string) => {
  const res = await axiosInstace.post("/api/teacher",
    {
      formation,
      departament
    }
  );

  return res.data;
}

// Solicitar categoria de aluno
export const BecomeStudent = async (course: string, matricula: string) => {
  const res = await axiosInstace.post("/api/become/student",
    {
      course,
      matricula
    }
  );

  return res.data;
}

// Buscar usuaŕios
export const SearchUsers = async (q: string) => {
  const res = await axiosInstace.get(`/api/search/user?q=${q}`);

  return res.data
}

// Seguir usuário
export const FollowUser = async (userToFollowId: string | undefined) => {
  const res = await axiosInstace.post(`/api/follow/user/${userToFollowId}`,
    {}
  )

  return res.data;
}
