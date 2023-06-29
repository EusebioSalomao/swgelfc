import { Router } from "express";
import { minipautas, pauta, pautas, pedagogicoHome } from "../controlles/pedagogico.controll.js";
const router = Router()

router.get('/', pedagogicoHome)
router.get('/minipautas', minipautas)
router.get('/pautas', pautas)
router.get('/pauta/:id', pauta)

export default router