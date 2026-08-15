import sessionModel from "./session.model.js";

export const SessionRepository = {
    async create(
        userId: string,
        refreshTokenHash: string,
        expiresAt: Date
    ) {
        return await sessionModel.create({
            userId,
            refreshTokenHash,
            expiresAt
        })
    },

    async findByRefreshTokenHash(
        refreshTokenHash: string
    ) {
        return await sessionModel.findOne({
            refreshTokenHash
        })
    },

    async deleteByRefreshTokenHash(
        refreshTokenHash: string
    ) {
        return await sessionModel.deleteOne({
            refreshTokenHash
        })
    }
}