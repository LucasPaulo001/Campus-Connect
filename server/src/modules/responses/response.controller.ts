import { Response } from "express";
import { CustomRequest } from "../../middlewares/AuthGuard.js";
import { CreateResponseService, DeleteResponseService, EditResponseService, LikeResponseService } from "./services/ResponseAction.service.js";
import { ListResponsesService } from "./services/ResponseList.service.js";

// Criar resposta
export async function CreateResponseController(
  req: CustomRequest,
  res: Response
) {
  try {
    const authorId = req.user._id;

    const commentId = req.params.id;

    const { content } = req.body;

    const result = await CreateResponseService(authorId, commentId, content);

    res.status(201).json({ msg: result.msg, response: result.response });
  } catch (err: any) {
    res.status(500).json({
      msg: "Erro interno do servidor.",
      err: err.message,
    });
  }
}

// Deletar resposta
export async function DeleteResponseController(
  req: CustomRequest,
  res: Response
) {

  try{

    const responseId = req.params.id;

    const result = await DeleteResponseService(responseId);

    res.status(200).json({ msg: result.msg });

  }
  catch(err: any){
    res.status(500).json({
      msg: "Erro interno do servidor.",
      err: err.message,
    });
  }

}

// Editar resposta
export async function EditResponseController(req: CustomRequest, res: Response){
  try{

    const userId = req.user._id;

    const responseId = req.params.id;

    const updates = req.body;

    const result = await EditResponseService(responseId, userId, updates);

    res.status(201).json({ msg: result.msg, new: result.new });

  }
  catch(err: any){
    res.status(500).json({
      msg: "Erro interno do servidor.",
      err: err.message,
    });
  }
}

// Like em respostas
export async function LikeResponsesController(req: CustomRequest, res: Response){
  try{

    const userId = req.user._id;

    const responseId = req.params.id;

    const result = await LikeResponseService(userId, responseId);

    res.status(200).json({msg: result.msg, liked: result.liked});

  }
  catch(err: any){
    res.status(500).json({
      msg: "Erro interno do servidor.",
      err: err.message,
    });
  }
}

// Listar respostas de um comentário
export async function ListResponsesController(req: CustomRequest, res: Response){
  try{
  
    const commentId = req.params.id;

    const result = await ListResponsesService(commentId);

    res.status(200).json({count: result.count, responses: result.formatedData});

  }
  catch(err: any){

    res.status(500).json({
      msg: "Erro interno do servidor.",
      err: err.message,
    });

  }
}
