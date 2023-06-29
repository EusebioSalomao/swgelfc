import Pauta from "../models/pauta.modell.js"

export const createPautaService = (novaPauta) => Pauta(novaPauta).save()

export const findPautasByIdAnoService = (idAno) => Pauta.find({idAno: idAno}).lean().populate("classe").populate("turma").populate("curso")

export const findPautaByIdService = (idPauta) => Pauta.findById(idPauta).lean().populate("turma").populate("classe").populate("curso")