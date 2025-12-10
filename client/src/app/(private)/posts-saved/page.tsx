"use client";

import { LoadingPage } from "@/components/Loading/LoadingPage";
import { NotFound } from "@/components/NotFound/NotFound";
import { PostCard } from "@/components/PostCard/PostCard";
import { useActionContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function PostsSaved() {
  const { token } = useAuthContext();
  const { listSavedPosts, postSaved, loadingAction } = useActionContext();

  useEffect(() => {
    listSavedPosts(token);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {postSaved?.length == 0 || postSaved === null ? (
        <NotFound text="Nenhuma postagem salva..." />
      ) : (
        postSaved?.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            content={post.content}
            created_at={post.createdAt}
            likes_count={post.likes}
            author={post.author}
            postId={post.id}
            liked_by_me={false}
          />
        ))
      )}
    </div>
  );
}
