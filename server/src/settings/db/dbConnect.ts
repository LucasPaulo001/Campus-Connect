import mongoose from "mongoose";

export const dbConnect = async () => {
    const db_uri = process.env.DB_URI;

    if(!db_uri){
        console.error("Variável de ambiente indefinida: 'DB_URI.'");
        process.exit(1);
    }

    try{
        await mongoose.connect(db_uri);
        console.log("Conectado ao mongoose.");
    }
    catch(err: any){
        console.error(err);
    }
}