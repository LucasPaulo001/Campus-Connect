import { Types } from "mongoose";
import { FollowRepository } from "../follow.repository.js";


export async function ListFollowersService(followingId: string) {
  if (!followingId) {
    throw new Error("Id de usuário inválido.");
  }

  const followers = await FollowRepository.followers(followingId);

  const followersFormated = followers.map((follow: any) => ({
    id: follow._id,
    follower: {
      id: follow.follower._id,
      name: follow.follower.name,
      biography: follow.follower.biography,
      role: follow.follower.role,
      xp: follow.follower.xp,
    },
    following: {
      id: follow.follower._id,
      name: follow.follower.name,
      biography: follow.follower.biography,
      role: follow.follower.role,
      xp: follow.follower.xp,
    },
  }));

  return {
    followersFormated,
  };
}
