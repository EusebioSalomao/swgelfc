import {Router} from 'express'
import { addCandCont, admitiCand, allCandidatos, consultCand, deleteCand, saveCandidato, saveEdidarCand, wCandidato, wDetalheCand, wEdidarCand } from '../controlles/candidato.controll.js'
const router = Router()

router.get('/', allCandidatos)
router.get('/add', wCandidato)
router.post('/addCont', addCandCont)
router.post('/save', saveCandidato)
router.get('/detalhes/:id', wDetalheCand)
router.get('/edidar/:id', wEdidarCand)
router.post('/edidar', saveEdidarCand)
router.get('/deletar/:id', deleteCand)
router.post('/consultar', consultCand)
router.post('/admitir', admitiCand)

export default router