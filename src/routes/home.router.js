import { Router } from "express";
import { inicio, sobreNos } from "../controlles/home.controll.js";
const router = Router()

router.get('/', inicio)
router.get('/sobreNos', sobreNos)

export default router