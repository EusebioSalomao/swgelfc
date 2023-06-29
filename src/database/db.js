import mongoose from "mongoose"
const connectDB = () => {
    console.log("Aguardando a conexão com o Mongodb Atla...")

    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb+srv://salomao:terebango@cluster0.rmvzzy3.mongodb.net/?retryWrites=true&w=majority").then(() => {
        console.log("BD SS Mongo Atlas conectado em online!")
    }).catch((erro) => {
        console.log("Erro de Conexão com Mongo Atlas: " + erro)
        //mongoose.connect("mongodb://localhost/BD_SMedia")
        
        mongoose.connect('mongodb://127.0.0.1/BD_SWGELFC').then(()=>{
        console.log("BD Local(BD_SWGEFLC) conectado com sucesso!")
        }).catch((erro)=>{
        console.log("Erro de Conexão com o BD Local: " + erro)
        })
    })
}
//

export default connectDB;