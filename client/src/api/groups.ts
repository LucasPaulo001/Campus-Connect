import { ParamValue } from "next/dist/server/request/params";
import axiosInstace from "./axiosInstance";

// Listagem de grupos criados pelo professor
export const LoadGroups = async (token: string) => {
  const res = await axiosInstace.get("api/group/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// Busca de estudantes
export const SearchStudents = async (token: string, q: string) => {
  const res = await axiosInstace.get(`/api/search/user?q=${q}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// Criar grupo
export const CreateNewGroup = async (
  name: string,
  description: string,
  members: string[],
  token: string
) => {
  const res = await axiosInstace.post(
    "/api/group",
    {
      name,
      description,
      members,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// Detalhes de um grupo
export const LoadGroup = async (
  token: string,
  group_id: number | ParamValue
) => {
  const res = await axiosInstace.get(`/api/group/${group_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// Criando desafio
export const CreateChallenge = async (
  token: string,
  group_id:  string,
  title: string,
  description: string,
  type: string,
  data: any,
) => {
  const res = await axiosInstace.post(
    `/api/challenge/group/${group_id}`,
    {
      title,
      description,
      type,
      data
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// Listar desafios
export const LoadChallenges = async (token: string, group_id: string) => {
  const res = await axiosInstace.get(`/api/challenges/group/${group_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// Deletar desafio
export const DeleteChallenge = async (token: string, challengeId: string) => {
  const res = await axiosInstace.delete(`/api/challenge/${challengeId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
}