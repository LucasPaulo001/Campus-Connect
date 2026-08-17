import { ParamValue } from "next/dist/server/request/params";
import axiosInstance from "./axios/axiosInstance";

// Listagem de grupos criados pelo professor
export const LoadGroups = async () => {
  const res = await axiosInstance.get("api/group/user");

  return res.data;
};

// Busca de estudantes
export const SearchStudents = async (q: string) => {
  const res = await axiosInstance.get(`/api/search/user?q=${q}`);

  return res.data;
};

// Criar grupo
export const CreateNewGroup = async (
  name: string,
  description: string,
  members: string[],
) => {
  const res = await axiosInstance.post(
    "/api/group",
    {
      name,
      description,
      members,
    }
  );

  return res.data;
};

// Detalhes de um grupo
export const LoadGroup = async (
  group_id: number | ParamValue
) => {
  const res = await axiosInstance.get(`/api/group/${group_id}`);

  return res.data;
};

// Criando desafio
export const CreateChallenge = async (
  group_id:  string,
  title: string,
  description: string,
  type: string,
  data: any,
) => {
  const res = await axiosInstance.post(
    `/api/challenge/group/${group_id}`,
    {
      title,
      description,
      type,
      data
    }
  );

  return res.data;
};

// Listar desafios
export const LoadChallenges = async (group_id: string) => {
  const res = await axiosInstance.get(`/api/challenges/group/${group_id}`);

  return res.data;
};

// Deletar desafio
export const DeleteChallenge = async (challengeId: string) => {
  const res = await axiosInstance.delete(`/api/challenge/${challengeId}`);

  return res.data;
}