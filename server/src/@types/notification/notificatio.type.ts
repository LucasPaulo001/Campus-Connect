import { Types } from "mongoose";

export type TNotification = {
    _id?: string;
    user: Types.ObjectId;
    type: string;
    message: string;
    link?: string;
    readAt?: Date;
}

export enum NotificationType {
  LIKE = "like",
  COMMENT = "comment",
  REPLY = "reply",
  XP = "xp",
  FEEDBACK = "feedback",
  SYSTEM = "system",
  FOLLOW = "follow"
}
