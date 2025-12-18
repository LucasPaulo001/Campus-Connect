"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { LoadingPage } from "@/components/Loading/LoadingPage";
import { PostCard } from "@/components/PostCard/PostCard";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { useActionContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRef } from "react";

export default function Home() {
  const { loadNextPage, posts, loadingAction } = useActionContext();
  const { token } = useAuthContext();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { hasNextPage } = useActionContext();

  useEffect(() => {
    loadNextPage(token);
    console.count("loadNextPage");
  }, []);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !loadingAction) {
          loadNextPage(token);
        }
      },
      { rootMargin: "200px" }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, [posts.length, hasNextPage, loadingAction]);

  return (
    <div className="flex items-start gap-10 justify-around">
      <div className="hidden md:flex sticky top-25 h-full">
        <Sidebar />
      </div>

      <div className="flex flex-col items-center justify-center gap-15 w-screen">
        {Array.isArray(posts) &&
          posts?.map((post, index) => (
            <PostCard
              key={`${post.id}_${index}`}
              title={post.title}
              content={post.content}
              created_at={post.createdAt}
              likes_count={post.likes}
              author={post.author}
              postId={post.id}
              liked={post.liked}
              saved={post.saved}
            />
          ))}
        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="h-10 flex items-center justify-center"
          >
            {loadingAction && <LoadingPage />}
          </div>
        )}
      </div>
    </div>
  );
}
