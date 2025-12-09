import { Schema, Types } from "mongoose";

type TResponse = {
  _id?: string;
  author: Schema.Types.ObjectId | string;
  content: string;
};

type TComment = {
  _id?: string;
  author: Schema.Types.ObjectId | string;
  content: string;
  responses?: TResponse[];
};

export type TAuthor = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
};

export type TPost = {
  _id?: string;
  title: string;
  author: TAuthor | Types.ObjectId;
  content: string;
  tags?: string[];
  likes?: Schema.Types.ObjectId[] | string;
  comments?: TComment[];
  createdAt: Date;
};
