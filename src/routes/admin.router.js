import { Router } from "express";
import { admin } from "../controlles/admin.controll.js";
const router = Router()

router.get('/:id', admin)

export default router