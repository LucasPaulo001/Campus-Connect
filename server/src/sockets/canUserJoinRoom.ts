export async function isUserInGroup(
  userId: string,
  groupId: string
): Promise<boolean> {
  return true;
}

export async function canUserJoinRoom(
  userId: string,
  roomId: string
): Promise<boolean> {

  const [type, ref] = roomId.split(":");

  if (type === "group") {
    return await isUserInGroup(userId, ref);
  }

  if (type === "post") {
    return true;
  }

  if (type === "private") {
    return ref.includes(userId);
  }

  return false;
}
