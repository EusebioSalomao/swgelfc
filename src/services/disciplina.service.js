import Disciplina from "../models/disciplina.modell.js";

export const createDisciplinaService = (disciplina) => Disciplina(disciplina).save()

export const findAllDiscplinasService = () => Disciplina.find().lean()

export const findDisciplinaByIdService = (idDisciplina) => Disciplina.findById(idDisciplina).lean().populate("idProfessor").populate("idClasse")

export const findDisciplinaByIdAndUpdateService = (idDisciplina, disciplina) => Disciplina.findByIdAndUpdate(idDisciplina, disciplina).lean()

        const turmas = []
export const findDisciplinaByIdProfessorServece = (idProfessor) => Disciplina.find({idProfessor: idProfessor}).lean().populate("idClasse").populate("idTurma")