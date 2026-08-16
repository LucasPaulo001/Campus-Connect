import { UserRepository } from "./user.repository.js";
import { jwtGenerate } from "../../settings/jwt/jwt.js";
import bcrypt from "bcrypt";
import { TUpdateUser, TUser } from "../../@types/user/user.type.js";
import { FollowRepository } from "../follow/follow.repository.js";
import JWTRefreshGenerate from "../../settings/jwt/jwt.refresh.js";
import { SessionRepository } from "../session/session.repository.js";
import jwt from "jsonwebtoken";
import HashToken from "../session/session.tool.js";

// Registro
export async function RegisterService({
  name,
  nameUser,
  email,
  password,
}: TUser) {
  // Buscando usuário
  const user = await UserRepository.findByEmail(email);

  if (user) {
    throw new Error("Usuário já existe.");
  }

  // Verificando nome de usuário
  const existsNameUser = await UserRepository.findByUserName(nameUser);

  if (existsNameUser) throw new Error("Nome de usuário já está em uso.");

  // Criptografando senha
  const salt = await bcrypt.genSalt();
  const hashPass = await bcrypt.hash(password, salt);

  // Construindo dados
  const data: TUser = {
    name,
    nameUser,
    email,
    password: hashPass,
    biography: "",
  };

  // Salvando no banco
  await UserRepository.create(data);

  return `Registro realizado com sucesso.`;
}

// Login
export async function LoginService(email: string, password: string) {
  const user = await UserRepository.findByEmail(email);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error("Senha incorreta.");
  }

  const token = await jwtGenerate(user._id.toString());

  const refreshToken = await JWTRefreshGenerate(user._id.toString());

  await SessionRepository.create(
    user._id,
    refreshToken,
    new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    )
  );

  return {
    token,
    refreshToken
  };
}

// Perfil
export async function ProfileService(user: TUser) {
  if (!user._id) {
    throw new Error("Id de usuário inválido.");
  }

  const followers = await FollowRepository.following(user._id);

  const following = await FollowRepository.followers(user._id);

  const dataFormated = {
    id: user?._id,
    name: user.name,
    name_user: user.nameUser,
    role: user.role,
    email: user.email,
    biography: user.biography,
    xp: user.xp,
    avatarUrl: user.avatarUrl,
    followers: followers.length,
    following: following.length,
  };

  return dataFormated;
}

// Editar dados
export async function ProfileEditService(id: string | undefined, data: TUpdateUser) {
  const user = await UserRepository.findById(id);

    if(!user) throw new Error("Usuário não encontrado.");

    const updates: Partial<TUpdateUser> = {};

    if(data.name !== undefined && data.name !== user.name){
        updates.name = data.name;
    }

    if(data.nameUser !== undefined && data.nameUser !== user.nameUser){
        const existUserName = await UserRepository.findByUserName(data.nameUser);

        if(existUserName){
            throw new Error("O nome de usuário já existe.");
        }
        else {
            updates.nameUser = data.nameUser;
        }
    }

    if(data.password !== undefined && data.password !== user.password){
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(data.password, salt);

        updates.password = hashPass;
    }

    if(data.biography !== undefined && data.biography !== user.biography){
      updates.biography = data.biography;
    }

    if(data.avatarUrl !== undefined && data.avatarUrl !== user.avatarUrl){
      updates.avatarUrl = data.avatarUrl;
    }

    if(Object.keys(updates).length === 0){
        return { message: "Nada para atualizar" };
    }

    const updatedUser = await UserRepository.update(id, updates);

    return { updatedUser }
}

//Refresh token
export async function RefreshTokenServices(refreshToken: string){

  const secret = process.env.JWT_SECRET_REFRESH;

  if(!secret){
    throw new Error(
      "JWT_SECRET_REFRESH não configurado."
    );
  }

  let decoded: { id: string }

  try{
    decoded = jwt.verify(
      refreshToken,
      secret
    ) as {
      id: string
    }
  }
  catch{
    throw new Error(
      "Refresh token inválido ou expirado."
    );
  }

  //Gera o hash
  const refreshTokenHash = HashToken(refreshToken);

  //Procura sessão
  const session = await SessionRepository.findByRefreshTokenHash(refreshTokenHash);

  if(!session){
    throw new Error("Sessão inválida.");
  }

  //Verifica expiração da sessão
  if(session.expiresAt < new Date()){
    await SessionRepository.deleteByRefreshTokenHash(
      refreshToken
    );

    throw new Error(
      "Sessão expirada."
    )
  }

  //Gera novo access token
  const accessToken = JWTRefreshGenerate(decoded.id);

  return {
    accessToken
  }

}

//Logout
export async function LogoutService(refreshToken: string){
  const refreshTokenHash = HashToken(refreshToken);

  await SessionRepository.deleteByRefreshTokenHash(
    refreshTokenHash
  );
}

// Buscar usuários
export async function SearchUsersService(userId: string | undefined, query: string) {
  if (!query) return [];

  if (!userId) {
    throw new Error("Usuário indefinido.")
  }

  const users = await UserRepository.search(userId, query);

  return users.map((u) => ({
    id: u._id,
    name: u.name,
    role: u.role,
    avatarUrl: u.avatarUrl,
  }));
}
