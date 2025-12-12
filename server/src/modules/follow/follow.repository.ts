import { Types } from "mongoose";
import { TFollow } from "../../@types/following/following.type.js";
import followModel from "./follow.model.js";

export const FollowRepository = {

    create(data: TFollow){
        return followModel.create(data);
    },

    // seguindo
    followers(id: string){
        return followModel.find({ follower: id }).populate("follower").populate("following");
    },

    // seguidores 
    following(id: string){
        return followModel.find({ following: id });
    },

    findOne(followerId: Types.ObjectId, followingId: Types.ObjectId){
        return followModel.findOne({follower: followerId, following: followingId});
    },

    deleteOne(id: string){
        return followModel.deleteOne({ _id: id });
    }

}