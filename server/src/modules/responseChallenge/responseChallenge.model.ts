import mongoose, { Types } from "mongoose";
import { TResponseChallenge } from "../../@types/responseChallenge/responseChallenge.type.js";

const ResponseChallengeSchema = new mongoose.Schema<TResponseChallenge>({

    user: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    },

    challenge: {
        type: Types.ObjectId,
        required: true,
        ref: "Challenge"
    },

    response: {
        type: String
    },

    feedback: {
        type: String
    },

    xpReseive: {
        type: Number
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("ResponseChallenge", ResponseChallengeSchema);