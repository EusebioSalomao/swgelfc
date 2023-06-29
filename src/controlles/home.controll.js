import { findAnoLectivoByEstadoService } from "../services/anoLectivo.service.js"

export const inicio = async (req, res) => {
    try {
        const estado = 'Activo'
        const anoActivo = await findAnoLectivoByEstadoService(estado)
        let candidaturaAberta = ''
        if(anoActivo.candidatura == 'Aberta'){
            candidaturaAberta = 'sim'
        }
        res.render('home/principal', {candidaturaAberta})
        
    } catch (error) {
        res.status(500).send({mesage: error.mesage})
    }
}

export const sobreNos = async (req, res) => {
    try {
        res.render('home/sobreNos')
    } catch (error) {
        res.status(500).send({mesage: error.mesage})
    }
}