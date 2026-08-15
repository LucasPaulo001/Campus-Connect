import jwt from "jsonwebtoken";

const jwt_secret_refresh = process.env.JWT_SECRET_REFRESH;

export default function JWTRefreshGenerate(userId: string){
    if(!jwt_secret_refresh){
        throw new Error("Variável de ambiente 'jwt_secret_refresh' indefinida.");
    }

    return jwt.sign(
        { userId },
        jwt_secret_refresh,
        { expiresIn: "7d" }
    );
}