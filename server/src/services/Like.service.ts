import { Types } from "mongoose";

type TToggleLike = {
    userId: string;
    entityName: string;
    entityId: string;
    entityRepository: any;
    userRepository: any;
}

export async function ToggleLike({userId, entityName, entityId, entityRepository, userRepository}: TToggleLike) {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const entitie = await entityRepository.findById(entityId);

  if (!entitie) {
    throw new Error(`${entityName} não encontrado(a)`);
  }

  const userIdObject = new Types.ObjectId(user._id);

  const existsLike = entitie.likes?.some((entite: any) =>
    entite.equals(userIdObject)
  );

  if (!existsLike) {
    entitie.likes?.push(userIdObject);
  } else {
    entitie.likes = entitie.likes?.filter(
      (entite: any) => !entite.equals(userId)
    );
  }

  const likedByMe = entitie.likes.some((id: any) => id.equals(userId));


  await entitie.save();

  return {
    msg: existsLike ? "Like removido" : "Like adicionado",
    liked: likedByMe
  };
}
