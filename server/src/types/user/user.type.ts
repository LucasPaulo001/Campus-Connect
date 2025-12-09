
export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  nameUser: string;
  role?: "admin" | "professor" | "estudante";
};
