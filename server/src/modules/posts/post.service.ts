import { TAuthor, TPost } from "../../types/post/post.type.js";
import { PostRepository } from "../posts/post.repository.js";
import { UserRepository } from "../users/user.repository.js";
import { TeacherRepository } from "../teacher/teacher.repository.js";
import { Types } from "mongoose";

export type TCreatePostData = {
  title: string;
  content: string;
  tags: string[];
  author: Types.ObjectId; // teacherId
};

export type TCreatePostRequest = {
  title: string;
  content: string;
  tags: string[];
  author: string; // userId (string)
};


// Criar postagem
export async function CreatePostService({
  title,
  content,
  tags,
  author,
}: TCreatePostRequest) {
  const user = await UserRepository.findById(author);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const teacher = await TeacherRepository.findByUser(author);

  if (!teacher) {
    throw new Error("Professor não encontrado.");
  }

  const teacherId = new Types.ObjectId(teacher._id);


  const data: TCreatePostData = {
    title,
    content,
    tags,
    author: teacherId,
  };

  const newPost = await PostRepository.create(data);

  return { msg: `Postagem adicionada com sucesso.`, post: newPost };
}

// Listar postagens
export async function ListAllPostService() {
  const posts = await PostRepository.findAll();

  const dataFormated = posts.map((post) => {
    const author = post.author as TAuthor;
    const user = author?.user

    return {
    id: post._id,
    title: post.title,
    content: post.content,
    author: user
      ? {
          id: author._id,
          name: author.user.name,
          email: author.user.email,
          role: author.user.role
        }
      : null,
    likes: post?.likes?.length,
    comments: post?.comments?.length,
    createdAt: post.createdAt,
  }});

  return {dataFormated};
}

// Deletar postagem
export async function DeletePostService(postId: string) {

  const post = await PostRepository.findById(postId);

  if (!post){
    throw new Error("Postagem não encontrada.");
  }

  await PostRepository.deleteById(postId);

  return {
    msg: "Postagem deletada com sucesso",
    postId: postId
  }

}

// Listar postagens do author
export async function ListAuthorPostsService(authorId: string) {

  const user = await UserRepository.findById(authorId);
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const teacher = await TeacherRepository.findByUser(authorId);
  if (!teacher) {
    throw new Error("Professor não encontrado para este usuário.");
  }

  const posts = await PostRepository.findPostByAuthor(teacher._id);

  const dataFormated = posts.map((post: TPost) => {
    const author = post.author as TAuthor;
    const user = author?.user

    return {
      id: post._id,
      author: user
        ? {
            id: author._id,
            name: author.user?.name,
            email: author.user?.email,
            role: author.user?.role
          }
        : null,
      title: post.title,
      content: post.content,
      tags: post.tags,
      likes: post.likes
    };
  });

  return { dataFormated };
}
