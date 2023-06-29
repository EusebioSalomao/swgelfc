import { Router } from "express";
import { abrirCandidatura, activarAnoLectivo, adAnoLectivo, allAnosLectivos, deletarAnoLectivo, desactivarAnoLectivo, ecerrarCandidatura, editAnoLectivo, editSave, gerirCurso, wAdAnoLectivo, wConfigAnoLectivo } from "../controlles/anoLectivo.controll.js";
const router = Router()

router.get('/', allAnosLectivos)
router.get('/add', wAdAnoLectivo)
router.post('/add', adAnoLectivo)
router.get('/config/:id', wConfigAnoLectivo)
router.post('/deletar', deletarAnoLectivo)
router.get('/activar/:id', activarAnoLectivo)
router.post('/desativar', desactivarAnoLectivo)
router.post('/gerirCurso', gerirCurso)
router.get('/edit/:id', editAnoLectivo)
router.post('/editSave', editSave)
router.get('/abrirCandidatura/:id', abrirCandidatura)
router.get('/encerrarCandidatura/:id', ecerrarCandidatura)

export default router