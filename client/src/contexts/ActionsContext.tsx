import React, { createContext, useState, useEffect, useContext } from "react";

import { loadPosts, likePosts } from "@/api/posts";
import { IPost } from "@/types";

interface IActionsContext {
    listPosts: (token: string) => Promise<any> 
    loadingAction: boolean
    posts: IPost[] | null
    likeInPost: (user_id: number, post_id: number, token: string) => Promise<void>
}

export const ActionContext = createContext<IActionsContext | null>(null);

export const ActionProvider = ({ children }: { children: React.ReactNode }) => {
    const [loadingAction, setLoadingAction] = useState<boolean>(false);
    const [posts, setPosts] = useState<IPost[] | null>(null);


    // Listar postagens do feed
    const listPosts = async (token: string) => {
        setLoadingAction(true);
        try{
            const res = await loadPosts(token);
            console.log(res);
            setPosts(res);
        }
        catch(err: any){
            console.log(err);
        }
        finally{
          setLoadingAction(false);  
        }
    }

    // Like nos posts
    const likeInPost = async (user_id: number, post_id: number, token: string) => {
        try{
            const res = await likePosts(user_id, post_id, token);
            console.log(res);

        }   
        catch(err: any){
            console.log(err);
        }

    }

    const contextValues = {
        listPosts,
        loadingAction,
        posts,
        likeInPost
    }

    return(
        <ActionContext.Provider value={contextValues}>
            {children}
        </ActionContext.Provider>
    )

}

export const useActionContext = () => {
  const context = useContext(ActionContext);
  if (context === null) {
    throw new Error("useListContext deve ser usado dentro de um ListProvider");
  }
  return context;
};


