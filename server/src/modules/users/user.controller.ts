import { Request, Response } from "express";
import {
  LoginService,
  LogoutService,
  ProfileEditService,
  ProfileService,
  RefreshTokenServices,
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

    res.cookie("accessToken", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      msg: "Login realizado com sucesso."
    });

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
export async function SearchUserController(req: CustomRequest, res: Response) {
  try {

    const { q } = req.query

    const userId = req.user._id;

    const result = await SearchUsersService(userId, String(q || ''));

    res.status(200).json(result);

  }
  catch (err: any) {

    res.status(500).json({ err: err.message });

  }
}

// Perfil de usuários
export async function ProfileUsersController(req: CustomRequest, res: Response) {
  try {

    const userId = req.params.id;

    const result = await ProfileUsersService(userId);

    res.status(200).json(result);

  }
  catch (err: any) {
    res.status(500).json({ err: err });
  }
}


//Refresh token
export async function RefreshTokenController(req: Request, res: Response) {
  try {
    const refreshToken = process.env.JWT_SECRET_REFRESH;

    if (!refreshToken) {
      return res.status(401).json({
        error: "Refresh token não encontrado."
      });
    }

    const result = await RefreshTokenServices(refreshToken);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 15 * 60 * 1000
    });

    return res.status(200).json({
      msg: "Access token renovado."
    });

  }
  catch (error: any) {
    return res.status(401).json({
      error: error.message
    })
  }
}

//Logout
export async function LogoutController(req: CustomRequest, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await LogoutService(refreshToken);
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none"
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none"
    });

    return res.status(200).json({
      msg: "Logout realizado com sucesso."
    });
  }
  catch (error: any) {
    return res.status(500).json({
      error: "Erro ao realizar logout."
    });
  }
}

