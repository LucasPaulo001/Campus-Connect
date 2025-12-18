"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  SetStateAction,
  useRef,
} from "react";

import {
  loadPosts,
  likePosts,
  loadComments,
  removeLikePost,
  LoadMyPosts,
  GetSavedPosts,
} from "@/api/posts";
import { IChallenge, IComment, INotification, IPost } from "@/types";
import { LoadChallenges } from "@/api/groups";
import { toast } from "sonner";
import { connectSocket } from "@/services/socket";
import { useAuthContext } from "./AuthContext";

interface IActionsContext {
  loadingAction: boolean;

  posts: IPost[] | [];

  loadNextPage: (token: string) => Promise<void>;

  resetFeed: () => void;

  hasNextPage: boolean;

  likeInPost: (post_id: string, token: string) => Promise<void>;

  listComments: (
    post_id: string | undefined,
    token: string
  ) => Promise<IComment[] | null>;

  comment: IComment[] | null;

  listMyPosts: (token: string) => Promise<any>;

  myPosts: IPost[] | [];

  postSaved: IPost[] | null;

  listSavedPosts: (token: string) => Promise<void>;

  listChallenges: (token: string, group_id: string) => Promise<any>;

  challenge: IChallenge[] | null;

  setPosts: React.Dispatch<SetStateAction<IPost[] | []>>;

  setMyPosts: React.Dispatch<SetStateAction<IPost[] | []>>;

  notification: any[] | [];
}

export const ActionContext = createContext<IActionsContext | undefined>(
  undefined
);

export const ActionProvider = ({ children }: { children: React.ReactNode }) => {
  const [loadingAction, setLoadingAction] = useState<boolean>(false);
  const [notification, setNotification] = useState<INotification[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [myPosts, setMyPosts] = useState<IPost[]>([]);
  const [postSaved, setPostSaved] = useState<IPost[] | null>(null);
  const [comment, setComments] = useState<IComment[] | null>(null);
  const [challenge, setChallenge] = useState<IChallenge[] | null>(null);
  const LIMIT = 5

  const isFetchingRef = useRef(false);

  const { user } = useAuthContext();

  useEffect(() => {
    const socket = connectSocket(user?.id);

    socket.on("notification", (data) => {
      setNotification((prev) => [data, ...prev]);
      toast(data.message);
      console.log("Nova notificação:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id]);

  // Listar postagens do feed
  const loadNextPage = async (token: string) => {
    if (isFetchingRef.current || !hasNextPage) return;

    isFetchingRef.current = true;
    setLoadingAction(true);
    console.count("loadNextPage");


    try {
      const res = await loadPosts(token, page);
      console.log(res)

      setPosts((prev) => [...prev, ...res]);
       setHasNextPage(res.length === LIMIT)
      setPage((prev) => prev + 1);
    } finally {
      isFetchingRef.current = false;
      setLoadingAction(false);
    }
  };

  const resetFeed = () => {
    setPosts([]);
    setPage(1);
    setHasNextPage(true);
  };

  // Listar postagens do usuário
  const listMyPosts = async (token: string) => {
    setLoadingAction(true);
    try {
      const data = await LoadMyPosts(token);
      console.log(data);
      setMyPosts(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoadingAction(false);
    }
  };

  // Listar postagens salvas
  const listSavedPosts = async (token: string) => {
    try {
      const data = await GetSavedPosts(token);
      console.log(data.post);
      setPostSaved(data.post);
    } catch (err: any) {
      console.log(err);
    }
  };

  // Like nos posts
  const likeInPost = async (post_id: string, token: string) => {
    try {
      await likePosts(post_id, token);
      // atualiza o estado global
      setPosts(
        (prev) =>
          prev?.map((post) =>
            post.id === post_id
              ? {
                  ...post,
                  liked_by_me: true,
                  likes_count: post.likes + 1,
                }
              : post
          ) || null
      );
    } catch (err: any) {
      console.log(err);
    }
  };

  // Listagem de comentários de um post
  const listComments = async (post_id: string | undefined, token: string) => {
    try {
      const res = await loadComments(post_id, token);

      console.log(res);

      setComments(res.msg);

      return res.msg;
    } catch (err: any) {
      console.log(err);
    }
  };

  // Listagem de desafios dos grupos
  const listChallenges = async (token: string, group_id: string) => {
    try {
      const res = await LoadChallenges(token, group_id);
      console.log(res);
      setChallenge(res);
    } catch (err: any) {
      console.log(err);
    }
  };

  const contextValues = {
    // Feed
    posts,
    loadNextPage,
    resetFeed,
    hasNextPage,

    // Estados gerais
    loadingAction,
    notification,

    // Likes
    likeInPost,

    // Comentários
    listComments,
    comment,

    // Usuário
    listMyPosts,
    myPosts,
    listSavedPosts,
    postSaved,

    // Grupos
    listChallenges,
    challenge,

    // Setters (se realmente precisar)
    setPosts,
    setMyPosts,
  };

  return (
    <ActionContext.Provider value={contextValues}>
      {children}
    </ActionContext.Provider>
  );
};

export const useActionContext = () => {
  const context = useContext(ActionContext);
  if (context === undefined) {
    throw new Error("use o actionContext dentro de um ActionProvider");
  }
  return context;
};
