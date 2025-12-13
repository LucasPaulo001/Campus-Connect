import { Response } from "express";
import {
  LoginService,
  ProfileEditService,
  ProfileService,
  RegisterService,
  SearchUsersService,
} from "./user.service.js";
import { CustomRequest } from "../../middlewares/AuthGuard.js";
import { ProfileUsersService } from "./services/userAction.service.js";

// Registro
export async function RegisterController(req: CustomRequest, res: Response) {
  try {
    const { name, nameUser, email, password } = req.body;

    const result = await RegisterService({ name, nameUser, email, password });

    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

// Login
export async function LoginController(req: CustomRequest, res: Response) {
  try {
    const { email, password } = req.body;

    const result = await LoginService(email, password);

    res.status(200).json({id: result.id, token: result.token});
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

// Perfil
export async function ProfileController(req: CustomRequest, res: Response) {
  const user = req.user;
  const result = await ProfileService(user);

  res.status(200).json(result);
}

// Editar dados do prfil
export async function ProfileEditController(req: CustomRequest, res: Response) {
  try {
    const id = req.user._id;

    const updates = req.body;

    const result = await ProfileEditService(id, updates);

    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

// Buscar usuários
export async function SearchUserController(req: CustomRequest, res: Response){
  try{

    const { q } = req.query

    const userId = req.user._id;

    const result = await SearchUsersService(userId, String(q || ''));

    res.status(200).json(result);

  }
  catch(err: any){

    res.status(500).json({ err: err.message });

  }
}

// Perfil de usuários
export async function ProfileUsersController(req: CustomRequest, res: Response) {
  try{

    const userId = req.params.id;

    const result = await ProfileUsersService(userId);

    res.status(200).json(result);

  }
  catch(err: any){
    res.status(500).json({ err: err });
  }
}