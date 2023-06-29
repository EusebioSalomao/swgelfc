import { Router } from "express";
const router = Router()
import { adCurso, allCursos, editCurso, excluirCurso, wAdCurso, wEditCurso } from "../controlles/curso.controll.js";

router.get('/', allCursos)
router.get('/add/:id', wAdCurso)
router.post('/add', adCurso)
router.get('/editar/:id', wEditCurso)
router.post('/editar', editCurso)
router.get('/excluir/:id', excluirCurso)


export default router