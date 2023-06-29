import { findUserByIdService } from "../services/user.service.js"

export const admin = async (req, res) => {
    try {
        const id = req.params.id
        const user = await findUserByIdService(id)
        res.render('admin/admin', {user})
    } catch (error) {
        res.status(500).send({mesage: error.mesage})
    }
}