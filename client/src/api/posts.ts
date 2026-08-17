import axiosInstance from "./axios/axiosInstance";

// Criar postagem
export const addPost = async (title: string, content: string | undefined, tags?: string[]) => {
  const res = await axiosInstance.post("/api/post", 
    { title, content, tags }
  );

  return res.data;
}

// Deletar postagens
export const deletePost = async (post_id: string | undefined) => {
  const res = await axiosInstance.delete(`/api/post/${post_id}`);

  return res.data;
}

// Editar postagens 
export const editPost = async (post_id: string | undefined, title: string, content: string | undefined, tags?: string[]) => {
  const res = await axiosInstance.patch(`/api/post/${post_id}`, 
    { title, content, tags }
  );

  return res.data;
}

// Listar postagens no feed
export const loadPosts = async (page: number) => {
  const res = await axiosInstance.get(`/api/post?page=${page}&limit=5`);

  return res.data;
};

// Listar postagens do usuário
export const LoadMyPosts = async () => {
  const res = await axiosInstance.get("/api/post/author");

  return res.data;
}

// Salvar postagem
export const SavePosts = async (post_id: string) => {
  const res = await axiosInstance.post(`/api/post/${post_id}`,
    {},
  );

  return res.data;
}

// Listar postagens salvas
export const GetSavedPosts = async () => {
  const res = await axiosInstance.get(`/api/post/saveds`);

  return res.data;
}

// Dar Like nos posts
export const likePosts = async (
  post_id: string | undefined,
) => {
  const res = await axiosInstance.post(
    `/api/post/like/${post_id}`,
    {}
  );

  return res.data.data;
};

// Retirar like
export const removeLikePost = async (
  user_id: string | undefined,
  post_id: string,

) => {
  const res = await axiosInstance.delete("/api/post/unlike", {
    data: {
      user_id,
      post_id,
    },
  });
  return res.data;
};

// Listar comentários de uma publicação
export const loadComments = async (post_id: string | undefined) => {
  const res = await axiosInstance.get(`/api/comment/post/${post_id}`);

  return res.data;
};

//Criar comentáio
export const createComents = async (
  content: string,
  post_id: string,
) => {
  const res = await axiosInstance.post(
    `/api/comment/post/${post_id}`,
    {
      content,
    }
  );

  return res.data;
};

// Editar comentário
export const editComment = async (
  commentId: string | undefined,
  content: string,
) => {
  const res = await axiosInstance.patch(
    `/api/comment/${commentId}`,
    { content }
  );

  return res.data;
};

// Deletar comentário
export const deleteComment = async (comment_id: string | undefined) => {
  const res = await axiosInstance.delete(`/api/comment/${comment_id}`)

  return res.data
}

// Dar Like nos comentários
export const likeComment = async (user_id: string | undefined, comment_id: string | undefined) => {
  const res = await axiosInstance.post(`/api/comment/like/${comment_id}`, {
    user_id
  });

  return res.data.data;
};

// Listar respostas de comentários
export const loadResponses = async (comment_id: string | undefined) => {
  const res = await axiosInstance.get(`/api/responses/comment/${comment_id}`);

  return res.data;
}

// Deletar respostas de comentário
export const deleteResponse = async (response_id: string) => {
  const res = await axiosInstance.delete(`/api/response/${response_id}`);

  return res.data;
}

// Responder Comentário
export const responseComment = async (comment_id: string | undefined, content: string) => {
  const res = await axiosInstance.post(`/api/response/comment/${comment_id}`,
    {
      content
    }
  );

  return res.data;
}
