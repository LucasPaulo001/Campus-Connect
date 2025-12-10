import { Response } from "express";
import { CustomRequest } from "../../middlewares/AuthGuard.js";
import { CreateGroupService } from "./services/GroupAction.service.js";

export async function CreateGroupController(req: CustomRequest, res: Response) {
  try {

    const authorId = req.user._id;

    const { name, description } = req.body;

    const result = await CreateGroupService({authorId, name, description});

    res.status(201).json({ msg: result.msg, new: result.newGroup });

  } catch (err: any) {

    res.status(500).json({
      msg: "Erro interno do servidor...",
      err: err.message,
    });

  }
}
