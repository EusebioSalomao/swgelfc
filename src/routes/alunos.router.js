import {Router} from 'express'
import { fichaAluno, matricular, tdAlunos, wAdmitir } from '../controlles/aluno.controll.js'
const router = Router()

router.get('/', tdAlunos)
router.get('/matricular/:id', wAdmitir)
router.post('/matricular/:id', matricular)
router.get('/ficha/:id', fichaAluno)

export default router