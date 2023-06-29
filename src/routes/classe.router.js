import { Router } from "express"; 
import { addClasse } from "../controlles/classe.controll.js";
const router = Router()

router.post('/add', addClasse)

export default router