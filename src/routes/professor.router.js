import { Router } from "express";
import { config, lancarNota, miniPauta, miniPautas, professor, turmasDoProf } from "../controlles/professor.controll.js";
import { verifyLancamento } from "../middlewares/professor.middlewere.js";
const router = Router()

router.get('/:id', professor)
router.get('/turmas/:id', turmasDoProf)
router.get('/minipautas/:id', miniPautas)
router.get('/minipauta/:id', miniPauta)
router.get('/config', config)
router.post('/lancarNota', verifyLancamento, lancarNota)

export default router