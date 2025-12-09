import { Response } from "express";
import { CustomRequest } from "../../middlewares/AuthGuard.js";
import { CreatePostService, DeletePostService, ListAllPostService, ListAuthorPostsService } from "./post.service.js";

// Criar postagem
export async function CreatePostController(req: CustomRequest, res: Response) {
    try{

        const author = req.user._id;

        const { title, content, tags } = req.body;

        const result = CreatePostService({ title, content, tags, author });

        res.status(201).json({mst: (await result).post, post: (await result).msg});

    }
    catch(err: any){
        res.status(500).json({error: "Erro interno do servidor.", err: err.message});
    }
}

// Listar postagem
export async function ListAllPostController(req: CustomRequest, res: Response) {
    try{

        const result = ListAllPostService();

        res.status(200).json((await result).dataFormated);

    }
    catch(err: any){
        res.status(500).json({error: "Erro interno do servidor.", err});
    }
}

// Deletar postagem
export async function DeletePostController(req: CustomRequest, res: Response) {
    try{

        const userId = req.params.id

        const result = await DeletePostService(userId);

        res.status(200).json(result);

    }
    catch(err: any){
        res.status(500).json("Erro interno do servidor.");
    }
}

// Listagem de postagens do usuário
export async function ListAuthorPostsController(req: CustomRequest, res: Response) {
    try{

        const authorId = req.user._id;

        const result = await ListAuthorPostsService(authorId);

        res.status(200).json(result.dataFormated);

    }
    catch(err: any){
        res.status(500).json({error: "Erro interno do servidor.", err: err.message});
    }
}