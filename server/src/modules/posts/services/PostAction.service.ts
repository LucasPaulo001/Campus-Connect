import { Types } from "mongoose";
import { UserRepository } from "../../users/user.repository.js";
import { TeacherRepository } from "../../teacher/teacher.repository.js";
import { PostRepository } from "../post.repository.js";
import { ToggleLike } from "../../../services/Like.service.js";
import { io } from "../../../sockets/socket.js";
import { NotificationRepository } from "../../notification/notificatioin.repository.js";
import { NotificationCreate } from "../../../services/Notification.service.js";
import { NotificationType } from "../../../@types/notification/notificatio.type.js";

export type TCreatePostData = {
  title: string;
  content: string;
  tags: string[];
  author: Types.ObjectId;
};

export type TCreatePostRequest = {
  title: string;
  content: string;
  tags: string[];
  author: string;
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

// Deletar postagem
export async function DeletePostService(postId: string) {
  const post = await PostRepository.findById(postId);

  if (!post) {
    throw new Error("Postagem não encontrada.");
  }

  await PostRepository.deleteById(postId);

  return {
    msg: "Postagem deletada com sucesso",
    postId: postId,
  };
}

// Salvar postagens
export async function SavePostService(postId: string, userId: string) {
  const post = await PostRepository.findById(postId);

  console.log(postId);

  if (!post) {
    throw new Error("Postagem não encontrada.");
  }

  const user = await UserRepository.findById(userId);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const post_id = new Types.ObjectId(post._id);

  const existsSaved = user.postsSaveds?.some((postId) =>
    postId.equals(post_id)
  );

  if (!existsSaved) {
    user.postsSaveds?.push(post_id);
  } else {
    user.postsSaveds = user.postsSaveds?.filter(
      (savedId) => !savedId.equals(savedId)
    );
  }

  const savedByMy = user.postsSaveds?.some((id) => id.equals(postId));

  await user.save();

  return {
    msg: existsSaved
      ? "Postagem removida dos salvos"
      : "Postagem salva com sucesso.",
    post: post,
    saved: savedByMy,
  };
}

type DataUpdatePost = {
  title: string;
  content: string;
  tags: string[];
};

// Editar postagem
export async function EditPostService(
  authorId: string,
  postId: string,
  updates: DataUpdatePost
) {
  const user = await UserRepository.findById(authorId);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const teacher = await TeacherRepository.findByUser(authorId);

  if (!teacher) {
    throw new Error("Professor não encontrado.");
  }

  const post = await PostRepository.findById(postId);

  if (!post) {
    throw new Error("Postagem não encontrada.");
  }

  if (post.author.toString() !== teacher._id.toString()) {
    throw new Error("Permissão de edição negada.");
  }

  const updatePost = await PostRepository.update(postId, updates);

  return {
    msg: "Postagem editada com sucesso.",
    post: updatePost,
  };
}

// Tipagem do author
export function isAuthor(obj: any): obj is { userId: Types.ObjectId } {
  return obj && typeof obj === "object" && "userId" in obj;
}

// Curtir postagens
export async function LikePostService(postId: string, userId: string) {
  const user = await UserRepository.findById(userId);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const post = await PostRepository.findById(postId);

  if (!post) {
    throw new Error("Postagem não encontrada.");
  }

  const result = await ToggleLike({
    userId,
    entityName: "Postagem",
    entityId: postId,
    entityRepository: PostRepository,
    userRepository: UserRepository,
  });

  if (isAuthor(post.author)) {
    if (result.liked && post.author.userId.toString() !== user._id.toString()) {

      // Criando notificação no banco
      const authorObjectId = new Types.ObjectId(post.author.userId._id);

      NotificationCreate(authorObjectId, "Alguém curtiu sua postagem", NotificationType.LIKE);

      //Emitindo notificação no socket
      io.to(post.author.toString()).emit("notification", {
        type: "like_post",
        message: "Alguém curtiu sua postagem.",
        postId,
        fromUser: {
          id: user._id,
          name: user.name,
          avatar: user.avatarUrl,
        },
        createdAt: new Date(),
      });
    }
  }

  return result;
}
