import { Response } from "express";
import { CustomRequest } from "../../middlewares/AuthGuard.js";
import {  CreateResponseChallengeService } from "./services/responseChallengeAction.service.js";

export async function CreateResponseChallengeController(req: CustomRequest, res: Response){
    try{

        const userId = req.user._id;

        const challengeId = req.params.id;

        const { response } = req.body;

        const result = await CreateResponseChallengeService(userId, challengeId, response);

        res.status(200).json(result);

    }
    catch(err: any){

        res.status(500).json({
            msg: "Erro interno do servidor.",
            error: err.message
        })

    }
}