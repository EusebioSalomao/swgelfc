import { Router } from "express";
import { addFuncionario, saveFuncionario, tdFuncionarios } from "../controlles/funcionario.controll.js";
const router = Router()

router.get('/', tdFuncionarios)
router.get('/add', addFuncionario)
router.post('/saveFuncionario', saveFuncionario)

export default router