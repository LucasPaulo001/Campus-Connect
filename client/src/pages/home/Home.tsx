"use client"

import { PostCard } from "@/components/PostCard/PostCard";
import { useActionContext } from "@/contexts/ActionsContext"
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";

export const HomePage = () => {

    const { listPosts, posts } = useActionContext();
    const { token } = useAuthContext();

    useEffect(() => {
        listPosts(token)
    }, [])

    return(
        <div className="flex justify-center">
            {
                posts?.map((post) => (
                    <PostCard
                        key={post.ID} 
                        title={post.title} 
                        content={post.content} 
                        created_at={post.CreatedAt} 
                        author={post.User}
                        postId={post.ID}

                    />
                ))
            }
        </div>
    )
}