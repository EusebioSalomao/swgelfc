import mongoose from "mongoose"
const Schema = mongoose.Schema;

const Pauta = new Schema({
    anoLectivo: {
        type: Schema.Types.ObjectId,
        ref: "anosLectivo",
        required: true
    },
    turma: {
        type: Schema.Types.ObjectId,
        ref: "turmas",
        required: true
    },
    classe: {
        type: Schema.Types.ObjectId,
        ref: "classes",
        required: true
    },
    curso: {
        type: Schema.Types.ObjectId,
        ref: "cursos",
        required: true
    },
    notasDisciplina: {
        type: Schema.Types.ObjectId,
        ref: "notasdisciplina",
        require: true
    }
    
})


const pauta  = mongoose.model("pautas", Pauta)
export default pauta