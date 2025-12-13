import { Types } from "mongoose";

export type TResponseChallenge = {
    _id?: string;
    user: Types.ObjectId;
    challenge: Types.ObjectId;
    response: string;
    xpReseive?: number;
    feedback?: string;
    createdAt?: Date;
}