// Criar resposta 

import { Types } from "mongoose";
import { ChallengeRepository } from "../../challenge/challenge.repository.js";
import { UserRepository } from "../../users/user.repository.js";
import { ResponseChallengeRepository } from "../responseChallenge.repository.js";

export async function CreateResponseChallengeService(userId: string, challengeId: string, response: string){

    const user = await UserRepository.findById(userId);

    if(!user) throw new Error("usuário não encontrado.");

    const challenge = await ChallengeRepository.findById(challengeId);

    if (!challenge) throw new Error("Desafio não encontrado");

    const userObjectId = new Types.ObjectId(user._id);
    const challengeObjectId = new Types.ObjectId(challenge._id);

    const data = {
        user: userObjectId,
        challenge: challengeObjectId,
        response: response
    }

    const newResponse = await ResponseChallengeRepository.create(data);

    return {
        msg: "Resposta enviada com sucesso.",
        response: newResponse
    }

}