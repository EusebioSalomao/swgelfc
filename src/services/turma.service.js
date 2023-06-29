import Turma from "../models/turma.modell.js";

export const createTurmaService = (turma) => Turma(turma).save();

export const findTurmaByIdService = (idTurma) => Turma.findOne({_id :idTurma}).lean()

export const findAllTurmasService = () => Turma.find().lean()

export const findTurmaByIdCursoService = (idCurso) => Turma.find({idCurso: idCurso}).lean()

export const findTurmasByIdClassedService = (idClasse) => Turma.find({idClasse: idClasse}).lean()

