"use client";

import { LoadingPage } from "@/components/Loading/LoadingPage";
import { PostCard } from "@/components/PostCard/PostCard";
import { useActionContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";
import Image from "next/image";
import { NotFound } from "@/components/NotFound/NotFound";

export const MyPostsPage = () => {

  const { token } = useAuthContext();
  const { listMyPosts, myPosts, loadingAction } = useActionContext();

  useEffect(() => {
    listMyPosts(token);
  }, [])

  if (loadingAction) return <LoadingPage />;

  if (myPosts?.length == 0) {
    return (
      <NotFound text="Você não tem postagens..." />
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {Array.isArray(myPosts) && myPosts?.map((myPost, index) => (
        <PostCard
          key={`${myPost.ID}_${index}`}
          title={myPost.title}
          content={myPost.content}
          created_at={myPost.created_at}
          likes_count={myPost.likes_count}
          author={myPost.User}
          postId={myPost.ID}
          tagsPost={myPost.tags}
          liked_by_me={myPost.liked_by_me}
        />
      ))}
    </div>
  );
};
