import axiosInstace from "./axiosInstance";
import { IPost } from "@/types";

// Listar postagens no feed
export const loadPosts = async (token: string) => {
  const res = await axiosInstace.get("/api/feed", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// Dar Like nos posts
export const likePosts = async (
  user_id: number,
  post_id: number,
  token: string
) => {
  const res = await axiosInstace.post("/api/post/like", 
    {
      user_id,
      post_id
    },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
