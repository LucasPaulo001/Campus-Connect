import { IUser } from "@/types";
import axiosInstance from "./axios/axiosInstance";

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
  const res = await axiosInstance.patch(
    "/api/auth/profile-edit",

    updates

  );

  return res.data;
};

// Solicitar categoria de professor
export const BecomeTeacher = async (formation: string, departament: string) => {
  const res = await axiosInstance.post("/api/teacher",
    {
      formation,
      departament
    }
  );

  return res.data;
}

// Solicitar categoria de aluno
export const BecomeStudent = async (course: string, matricula: string) => {
  const res = await axiosInstance.post("/api/become/student",
    {
      course,
      matricula
    }
  );

  return res.data;
}

// Buscar usuaŕios
export const SearchUsers = async (q: string) => {
  const res = await axiosInstance.get(`/api/search/user?q=${q}`);

  return res.data
}

// Seguir usuário
export const FollowUser = async (userToFollowId: string | undefined) => {
  const res = await axiosInstance.post(`/api/follow/user/${userToFollowId}`,
    {}
  )

  return res.data;
}
