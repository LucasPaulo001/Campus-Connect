import { ResponseChallengeRepository } from "../responseChallenge.repository.js";

// Listar feedbacks
export async function ListResponseChallengeService(responseChallengeId: string){
    const responseChallenge = await ResponseChallengeRepository.findById(responseChallengeId);

    if(!responseChallenge){
        throw new Error("Resposta de desafio não encontrada.")
    }

    return responseChallenge;
} 