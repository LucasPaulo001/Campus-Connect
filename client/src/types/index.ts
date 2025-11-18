export interface IUser {
    id: number,
    name: string,
    nameUser: string,
    email: string,
    role: string
}

interface Like {
    ID: number,
    UserId: number,
    PostId: number
}

export interface IPost {
    ID: number,
    title: string,
    content: string,
    CreatedAt: string,
    User: IUser,
    Likes: Like[]
}