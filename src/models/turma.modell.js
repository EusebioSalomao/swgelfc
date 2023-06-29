import mongoose from "mongoose"
const Schema = mongoose.Schema;

const Turma = new Schema({
    codigo: {
        type: String,
        required: true
    },
    periodo: {
        type: String,
        required: true
    },
    alunos: {
        type: Array,
        require: true
    },
    idClasse: {
        type: String,
        require: true
    },
    idCurso: {
        type: String,
        required: true
    },
    idAno: {
        type: String,
        required: true
    }
    
})


const turma  = mongoose.model("turmas", Turma)
export default turma