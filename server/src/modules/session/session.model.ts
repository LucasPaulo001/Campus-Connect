import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    refreshTokenHash: {
        type: String,
        required: true,
        unique: true
    },

    expiresAt: {
        type: Date,
        required: true
    }

}, { timestamps: true });


export default mongoose.model("Session", SessionSchema);