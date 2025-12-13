import { Types } from "mongoose";
import { UserRepository } from "../../users/user.repository.js";
import { FollowRepository } from "../follow.repository.js";
import { NotificationCreate } from "../../../services/Notification.service.js";
import { NotificationType } from "../../../@types/notification/notificatio.type.js";

// Seguir outro usuário
export async function FollowService(followerId: string, followingId: string) {
  if (followerId === followingId) {
    throw new Error("Você não pode se seguir.");
  }

  const follower = await UserRepository.findById(followerId);

  const following = await UserRepository.findById(followingId);

  if (!follower || !following) {
    throw new Error("Usuário não encontrado.");
  }

  const followerObjectId = new Types.ObjectId(follower._id);
  const followingObjectId = new Types.ObjectId(following._id);

  const data = {
    follower: followerObjectId,
    following: followingObjectId,
  };

  const existingFollow = await FollowRepository.findOne(data.follower, data.following);

  if (existingFollow) {
    await FollowRepository.deleteOne(existingFollow._id);

    return {
      msg: "Conexão desfeita",
      isFollowing: false,
    };
  }

  const newFollow = await FollowRepository.create(data);

  NotificationCreate(followingObjectId, "Alguém começou a seguir você", NotificationType.FOLLOW);

  return {
    msg: "Conexão feita com sucesso.",
    newFollow,
    isFollowing: true,
  };
}
