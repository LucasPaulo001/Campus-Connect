// Criar resposta 

import { Types } from "mongoose";
import { ChallengeRepository } from "../../challenge/challenge.repository.js";
import { UserRepository } from "../../users/user.repository.js";
import { ResponseChallengeRepository } from "../responseChallenge.repository.js";
import { TeacherRepository } from "../../teacher/teacher.repository.js";

export async function CreateResponseChallengeService(userId: string, challengeId: string, response: string) {

    const user = await UserRepository.findById(userId);

    if (!user) throw new Error("usuário não encontrado.");

    const challenge = await ChallengeRepository.findById(challengeId);

    if (!challenge) throw new Error("Desafio não encontrado");

    if (!response || response.trim().length === 0) {
        throw new Error("A resposta não pode ser vazia.");
    }

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

// feedback e atribuiçao de de xp do professor
export async function FeedBackResponse(responseChaId: string, teacherId: string, feedback: string) {

    if (!feedback || feedback.trim().length === 0) {
        throw new Error("O feedback não pode ser vazio.");
    }

    const responseChallenge = await ResponseChallengeRepository.findById(responseChaId);

    if (!responseChallenge) {
        throw new Error("Resposta de desafio não encontrada.")
    }

    if(responseChallenge.feedback){
        throw new Error("Essa resposta já foi avaliada.");
    }

    const userId = responseChallenge.user._id.toString();
    const user = await UserRepository.findById(userId);


    if (!user) {
        throw new Error("Usuário não encontrado.");
    }

    const teacher = await TeacherRepository.findByUser(teacherId);

    if (!teacher) {
        throw new Error("Professor não encontrado.");
    }

    const challenge = await ChallengeRepository.findById(responseChallenge.challenge._id.toString());

    if (!challenge) {
        throw new Error("Desafio não encontrado.");
    }

    if (challenge.author._id.toString() !== teacher._id.toString()) {
        throw new Error("Permissões insuficientes.");
    }

    const data = {
        feedback,
        xpReceive: challenge.data?.xp

    }

    await ResponseChallengeRepository.update(responseChaId, data);

    const xpToAdd = challenge.data?.xp ?? 0;

    if (typeof user.xp !== "number") throw new Error("XP inválido.");

    const newXp = {
        xp: user.xp + xpToAdd
    }

    await UserRepository.update(user._id, newXp);

    return {
        msg: "Feedback adicionado com sucesso."
    }
}