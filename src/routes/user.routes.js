import { Router } from "express";
const router = Router();
import { addUser, allUsers, deletUser, editUser, login, logout, telaLogin, wAddUser, wEditUser } from "../controlles/user.controll.js";
import {validFildUser} from '../middlewares/user.middlewer.js'

router.get('/allUsers', allUsers)
router.get('/login', telaLogin)
router.post('/login', login)
router.get('/logout', logout)
router.get('/add', wAddUser)
router.post('/add', validFildUser, addUser)
router.get('/deletUser/:id', deletUser)
router.get('/editUser/:id', wEditUser)
router.post('/editUser', editUser)




export default router