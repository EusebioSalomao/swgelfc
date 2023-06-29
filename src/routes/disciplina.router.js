import {Router} from 'express'
import { addDisciplina, tdDisciplina } from '../controlles/disciplina.controll.js';
const router = Router()

router.get('/', tdDisciplina)
router.post('/add', addDisciplina)

export default router;