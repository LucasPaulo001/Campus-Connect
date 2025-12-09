import { NextFunction, Response } from "express";
import { CustomRequest } from "./AuthGuard.js";

export const AuthRole = (...allowedRole: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      console.log(user)

      if (!user) {
        return res.status(401).json({ error: "Usuário não autênticado." });
      }

      if (!allowedRole.includes(user.role)) {
        return res.status(403).json({ error: "Permissão negada." });
      }

      return next();
    } catch (error: any) {
      return res.status(500).json({
        errors: "Erro interno de autorização.",
      });
    }
  };
};
