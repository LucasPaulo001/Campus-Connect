import { Response } from "express";
import { CustomRequest } from "../../middlewares/AuthGuard.js";
import { FollowService } from "./services/followAction.service.js";
import { ListFollowersService } from "./services/followList.service.js";

// Seguir
export async function FollowController(req: CustomRequest, res: Response){
    try{

        const followerId = req.user._id;
        const followingId = req.params.id;

        const result = await FollowService(followerId, followingId);

        res.status(200).json(result);

    }
    catch(err: any){
        res.status(500).json({error: err.message});
    }
}

export async function ListFollowsController(req: CustomRequest, res: Response) {
  try{

    const userId = req.user._id;

    const result = await ListFollowersService(userId);

    res.status(200).json(result);

  }
  catch(err: any){
    res.status(500).json({ err: err });
  }
}