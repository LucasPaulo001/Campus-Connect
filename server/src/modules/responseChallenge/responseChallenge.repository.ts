import { TResponseChallenge } from "../../@types/responseChallenge/responseChallenge.type.js";
import responseChallengeModel from "./responseChallenge.model.js";

export const ResponseChallengeRepository = {

    create(data: TResponseChallenge){
        return responseChallengeModel.create(data);
    },

    findById(id: string){
        return responseChallengeModel.findById(id);
    },

    update(id: string, data: Partial<TResponseChallenge>){
        return responseChallengeModel.findByIdAndUpdate(id);
    }

}