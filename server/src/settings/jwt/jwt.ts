import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const jwtGenerate = async (id: string) => {
  if (!JWT_SECRET) {
    console.error("Variável de ambiente ausente 'JWT_SECRET'");
    return;
  }

  try {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
  } catch (error: any) {
    console.error("Erro ao gerar token.");
  }
};
