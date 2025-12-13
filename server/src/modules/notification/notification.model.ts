import mongoose, { Types } from "mongoose";
import { TNotification } from "../../@types/notification/notificatio.type.js";

const NotificationSchema = new mongoose.Schema<TNotification>({
    user: {
        type: Types.ObjectId,
        ref: "User",
        index: true,
        required: true
    },

    message: {
        type: String,
        required: true,
        maxlength: 255
    },

    link: {
        type: String,
        default: null
    }, 

    readAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });


NotificationSchema.index({ user: 1, createdAt: -1 });

NotificationSchema.index({ user: 1, readAt: 1 });

NotificationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 } 
);

export const NotificationModel = mongoose.model(
  "Notification",
  NotificationSchema
);