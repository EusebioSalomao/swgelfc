import Notadisciplina from "../models/notasDisciplina.modell.js";

export const findNotasDisciplinaByIdMinipautaService = (idMinipauta) => Notadisciplina.find({idMinipauta: idMinipauta}).lean().populate('notas').populate('aluno')

export const findNotasDisciplinaByIdAluno = (idAluno) => Notadisciplina.find({aluno: idAluno}).lean().populate('notas').populate('aluno')

export const findNotasDisciplinaByIdAlunoPerfil = (idAluno) => Notadisciplina.find({aluno: idAluno}).lean().populate('notas').populate('idMinipauta')

export const createNotasDisciplinaService = (notasDisciplina) => Notadisciplina(notasDisciplina).save()