import { Types } from "mongoose";
import postModel from "./post.model.js";
import { TCreatePostData } from "./services/PostAction.service.js";
import { TPost } from "../../@types/post/post.type.js";

export const PostRepository = {
  findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    return Promise.all([
      postModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: "author",
          populate: {
            path: "user",
            select: "name emai role avatarUrl",
          },
        }),

      postModel.countDocuments(),
    ]).then(([posts, total]) => ({
      posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }));
  },

  findById(id: string) {
    return postModel.findById(id).populate("author");
  },

  findPostByAuthor(id: string) {
    const objectId = new Types.ObjectId(id);
    return postModel.find({ author: objectId }).populate({
      path: "author",
      populate: {
        path: "user",
        select: "name email role avatarUrl",
      },
    });
  },

  create(data: TCreatePostData) {
    return postModel.create(data);
  },

  deleteById(id: string) {
    return postModel.findByIdAndDelete(id);
  },

  update(id: string, data: Partial<TPost>) {
    return postModel.findByIdAndUpdate(id, data, { new: true });
  },
};
