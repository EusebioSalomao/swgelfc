import { Router } from "express";
import {turma, addTurma, gerirTurmas, tdTurmas, novaMatricula, saveNovaMatricula, turmaP, addProfessor } from "../controlles/turma.controll.js";
const router = Router();

router.post('/add', addTurma)
router.get('/', tdTurmas)
router.post('/gestao', gerirTurmas)
router.get('/pTurma/:id', turmaP)
router.get('/turma/:id', turma)
router.post('/novaMatricula', novaMatricula)
router.post('/saveNovaMatricula', saveNovaMatricula)
router.post('/addProfessor', addProfessor)

export default router;