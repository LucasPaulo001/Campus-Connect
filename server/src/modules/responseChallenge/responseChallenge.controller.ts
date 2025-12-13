import { Response } from "express";
import { CustomRequest } from "../../middlewares/AuthGuard.js";
import { CreateResponseChallengeService, FeedBackResponse } from "./services/responseChallengeAction.service.js";
import { ListResponseChallengeService } from "./services/responseChallengeList.service.js";

export async function CreateResponseChallengeController(req: CustomRequest, res: Response) {
    try {

        const userId = req.user._id;

        const challengeId = req.params.id;

        const { response } = req.body;

        const result = await CreateResponseChallengeService(userId, challengeId, response);

        res.status(200).json(result);

    }
    catch (err: any) {

        res.status(500).json({
            msg: "Erro interno do servidor.",
            error: err.message
        })

    }
}

export async function FeedBackResponseController(req: CustomRequest, res: Response) {
    try {

        const responseChaId = req.params.id;

        const teacherId = req.user._id;

        const {feedback} = req.body;

        const result = await FeedBackResponse(responseChaId, teacherId, feedback);

        res.status(201).json(result);
    }
    catch (err: any) {

        res.status(500).json({
            msg: "Erro interno do servidor.",
            error: err.message
        })

    }
}

export async function ListResponseChallengeController(req: CustomRequest, res: Response){
    try{

        const responseChallegeId = req.params.id;

        const result = await ListResponseChallengeService(responseChallegeId);

        res.status(200).json(result);
    }
    catch(err: any){
        res.status(500).json({
            msg: "Erro interno do servidor.",
            error: err.message
        })
    }
}