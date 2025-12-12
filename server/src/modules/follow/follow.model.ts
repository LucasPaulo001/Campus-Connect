import mongoose, { Schema } from "mongoose";
import { TFollow } from "../../@types/following/following.type.js";

const FollowSchema = new mongoose.Schema<TFollow>(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    following: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Follow", FollowSchema);
