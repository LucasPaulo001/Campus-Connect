import { Types } from "mongoose";
import { UserRepository } from "../../users/user.repository.js";
import { CommentRepository } from "../comment.repository.js";
import { PostRepository } from "../../posts/post.repository.js";
import { ToggleLike } from "../../../services/Like.service.js";

// Criar comentário
export async function CreateCommentService(
  author: string,
  content: string,
  postId: string
) {
  const user = await UserRepository.findById(author);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const post = await PostRepository.findById(postId);

  if (!post) {
    throw new Error("Postagem não encontrada.");
  }

  if (!content) {
    throw new Error("Informe um conteúdo válido.");
  }

  const authorObjectId = new Types.ObjectId(user._id);
  const postObjectId = new Types.ObjectId(post._id);

  const data = {
    author: authorObjectId,
    content,
    post: postObjectId,
  };

  const newComment = await CommentRepository.create(data);

  return {
    msg: "Comentário adicionado.",
    comment: newComment,
  };
}

// Deletar comentário
export async function DeleteCommentService(commentId: string, userId: string) {
  const comment = await CommentRepository.findById(commentId);

  if (!comment) {
    throw new Error("Comentário não encontrado.");
  }

  const user = await UserRepository.findById(userId);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (comment.author.toString() !== user._id.toString()) {
    throw new Error("Permissão de exclusão negada.");
  }

  await CommentRepository.deleteById(commentId);

  return {
    msg: "Comentário deletado com sucesso.",
  };
}

type TDataEditComment = {
  content: string;
};

// Editar comentário
export async function EditCommentService(
  authorId: string,
  commentId: string,
  updates: TDataEditComment
) {
  const comment = await CommentRepository.findById(commentId);

  if (!comment) {
    throw new Error("Comentário não encontrado.");
  }

  const user = await UserRepository.findById(authorId);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (comment.author.toString() !== user._id.toString()) {
    throw new Error("Permissões insuficientes.");
  }

  if (!updates) {
    throw new Error("Conteúdo inválido.");
  }

  const newComment = await CommentRepository.edit(commentId, updates);

  return {
    msg: "Comentário editado com sucesso.",
    comment: newComment,
  };
}

// Like em comentários
export async function LikeCommentService(userId: string, commentId: string) {
  return ToggleLike({
    userId,
    entityName: "Comentário",
    entityId: commentId,
    entityRepository: CommentRepository,
    userRepository: UserRepository,
  });
}
