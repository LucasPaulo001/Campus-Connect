import { Types } from "mongoose";

export type TFollow = {
    _id?: string;
    follower: Types.ObjectId;
    following: Types.ObjectId;
    createdAt?: Date;
}