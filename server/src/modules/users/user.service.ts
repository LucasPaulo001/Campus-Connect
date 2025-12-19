import { UserRepository } from "./user.repository.js";
import { jwtGenerate } from "../../settings/jwt/jwt.js";
import bcrypt from "bcrypt";
import { TUpdateUser, TUser } from "../../@types/user/user.type.js";
import { FollowRepository } from "../follow/follow.repository.js";

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

  return {
    id: user._id,
    token: token,
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

type DataUpdates = {
  name: string;
  nameUser: string;
  password: string;
};

// Editar dados
export async function ProfileEditService(id: string, data: DataUpdates) {
  const user = await UserRepository.findById(id);

    if(!user) throw new Error("Usuário não encontrado.");

    const updates: Partial<TUpdateUser> = {};

    if(data.name && data.name !== user.name){
        updates.name = data.name;
    }

    if(data.nameUser && data.nameUser !== user.nameUser){
        const existUserName = await UserRepository.findByUserName(data.nameUser);

        if(existUserName){
            throw new Error("O nome de usuário já existe.");
        }
        else {
            updates.nameUser = data.nameUser;
        }
    }

    if(data.password && data.password !== user.password){
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(data.password, salt);

        updates.password = hashPass;
    }

    if(Object.keys(updates).length === 0){
        return { message: "Nada para atualizar" };
    }

    console.log(updates);

    const updatedUser = await UserRepository.update(id, updates);

    return { updatedUser }
}

// Buscar usuários
export async function SearchUsersService(userId: string, query: string) {
  if (!query) return [];

  const users = await UserRepository.search(userId, query);

  return users.map((u) => ({
    id: u._id,
    name: u.name,
    role: u.role,
    avatarUrl: u.avatarUrl,
  }));
}
