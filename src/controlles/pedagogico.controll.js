import { findAlunosByIdTurma } from "../services/aluno.service.js"
import { findAnoLectivoByEstadoService } from "../services/anoLectivo.service.js"
import { findAllMinipautasService, findMinipautasByIdAnoService, findMinipautasByIdTurma } from "../services/minipauta.service.js"
import { findPautaByIdService, findPautasByIdAnoService } from "../services/pauta.service.js"

export const pedagogicoHome = async (req, res) => {
    try {
        res.render('pedagogico/pedagoHome')
    } catch (error) {
        res.status(500).send({mesage: error.mesage})
    }
}

export const minipautas = async (req, res) =>{
    try {
        const estado = 'Activo'
        const anoLectivoActivo = await findAnoLectivoByEstadoService(estado)
        const idAno = anoLectivoActivo._id
        const minipautas = await findMinipautasByIdAnoService(idAno)
       // return res.send({minipautas})
       
        
        res.render('pedagogico/minipautasPed', { minipautas, anoLectivoActivo })

    } catch (error) {
        res.status(500).send({mesage: error.mesage})
        
    }
}

export const pautas = async (req, res) => {
    try {
        const estado = 'Activo'
        const anoLectivo = await findAnoLectivoByEstadoService(estado)
        const idAno = anoLectivo._id
        const pautas = await findPautasByIdAnoService(idAno)
        const pautas10 = []
        const pautas11 = []
        const pautas12 = []
        pautas.forEach(element => {
            if(element.classe.designacao == '10ª Classe'){
                pautas10.push(element)
            }
            if(element.classe.designacao == '11ª Classe'){
                pautas11.push(element)
            }
            if(element.classe.designacao == '12ª Classe'){
                pautas12.push(element)
            }
            
        });
        //return res.send({pautas})
        res.render('pedagogico/pautas', {pautas10, pautas11, pautas12, anoLectivo})
    } catch (error) {
        res.status(500).send({mesage: error.mesage}) 
    }
}

export const pauta = async (req, res) => {
    try {
        const idPauta = req.params.id
        const pauta = await findPautaByIdService(idPauta)
        const idTurma = pauta.turma._id
        const alunosDaTurma = await findAlunosByIdTurma(idTurma)
        const notasDisciplinasTurma = await findMinipautasByIdTurma(idTurma)
        return res.send({notasDisciplinasTurma})
        res.render('pedagogico/pauta', {notasDisciplinasTurma, pauta})
    } catch (error) {
        res.status(500).send({mesage: error.mesage})
    }
} 