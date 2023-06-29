import { calcularMedias } from "../middlewares/professor.middlewere.js"
import { findAlunosByIdTurma } from "../services/aluno.service.js"
import { findFuncionariosByIdService, findFuncionariosUser } from "../services/funcionario.service.js"
import { findMinipautaByIdService, findMinipautasByIdProfessorService } from "../services/minipauta.service.js"
import { createNotaTrimestral, findAllNotasTrimSercice, findNotaByIdAndUpdateSerice, findNotasExistentByIdService } from "../services/notas.service.js"
import { createNotasDisciplinaService, findNotasDisciplinaByIdAluno, findNotasDisciplinaByIdMinipautaService } from "../services/notasDisciplina.service.js"
import { findAllTurmasService } from "../services/turma.service.js"
import { findUserByIdService } from "../services/user.service.js"

export const professor = async (req, res) => {
    try {
        const id = req.params.id
        const usuario = await findUserByIdService(id)
        const idUser = usuario._id
        const professor = await findFuncionariosUser(idUser)
        res.render('professor/professor', { professor })
    } catch (error) {
        res.status(500).send({ mesage: error.mesage })
    }
}

export const turmasDoProf = async (req, res) => {
    try {
        const id = req.params.id
        const professor = await findFuncionariosByIdService(id)
        const idTurmas = professor.turmas
        const tdTurmas = await findAllTurmasService()

        const turmas = []
        professor.turmas.forEach(turmP => {
            tdTurmas.forEach(turma => {
                if (turma._id == turmP) {
                    turmas.push(turma)
                }
            });
        });

        res.render('professor/gerirTurmas', { professor, turmas })
    } catch (error) {
        res.status(500).send({ mesage: error.mesage })
    }
}

export const miniPautas = async (req, res) => {
    try {
        const id = req.params.id
        const professor = await findFuncionariosByIdService(id)
        const idTurmas = professor.turmas
        const idProfessor = id
        const minipautas = await findMinipautasByIdProfessorService(idProfessor)


        res.render('professor/minipautas', { professor, minipautas })
    } catch (error) {
        res.status(500).send({ mesage: error.mesage })
    }
}
export const miniPauta = async (req, res) => {
    try {
        const user = req.user
        let lancarNota = ''
        const id = req.params.id
        const minipauta = await findMinipautaByIdService(id)
        const idTurmas = professor.turmas
        const tdTurmas = await findAllTurmasService()
        const idTurma = minipauta.idTurma._id
        const alunosTurma = await findAlunosByIdTurma(idTurma)
        const notasDisciplina = await findNotasDisciplinaByIdMinipautaService(id)
        const usuario = minipauta.idProfessor.usuario

        if(user){
            
            if(user._id == usuario){
                lancarNota = 'Autorisado'
                //return res.send('Autorizado')
            }
        }



        res.render('professor/minipauta', { minipauta, alunosTurma, notasDisciplina, lancarNota })
    } catch (error) {
        res.status(500).send({ mesage: error.mesage })
    }
}

export const lancarNota = async (req, res) => {
    try {
        const idAluno = req.body.aluno
        const idProfessor = req.body.idProfessor
        const idMinipauta = req.body.idMinipauta
        const idClasse = req.body.idClasse

        const trimeste = req.body.trimestre
        const notaDe = req.body.notaDe
        const notaString = req.body.nota
        let nota = parseInt(notaString)

        const notasDisciplina = await findNotasDisciplinaByIdMinipautaService(idMinipauta)
        const notasDoAluno = await findNotasDisciplinaByIdAluno(idAluno)
        let verifNota = ''
        let notasAchada = ''
//return res.send({notasDoAluno})
        notasDoAluno.forEach(element => {
            if (element.idMinipauta == idMinipauta) {
                verifNota = 'Ja'
                notasAchada = element.notas
            }
        });

        
        //const xxx = await createNotaTrimestral(testNotas)

        //const verNotasTrim = await findAllNotasTrimSercice()
        if (verifNota == '') {
            //return res.send("O aluno ainda não tem notas nesta discplina")
            let novaNotasDoaluno = {
                aluno: idAluno,
                professor: idProfessor,
                idMinipauta: idMinipauta,
                idClasse: idClasse,
            }
            let notaTrimestral = {}
            if (trimeste == 'primeiro') {
                switch (notaDe) {
                    case "avaliacao1":
                        //return res.send("Lançar nota no primeiro trimestre - av1")
                        notaTrimestral.av1T1 = nota
                        break;
                    case "avaliacao2":
                        // return res.send("Lançar nota no primeiro trimestre - av2")
                        notaTrimestral.av2T1 = nota

                        break;
                    case "avaliacao3":
                        //   return res.send("Lançar nota no primeiro trimestre - av3")
                        notaTrimestral.av3T1 = nota

                        break;
                    case "provaDoProfessor":
                        //   return res.send("Lançar nota no primeiro trimestre - av3")
                        notaTrimestral.pp1 = nota

                        break;
                    case "provaDoTrimestre":
                        //   return res.send("Lançar nota no primeiro trimestre - av3")
                        notaTrimestral.pt1 = nota

                        break;

                    default:
                        return res.send('Selecione os campos correctamente!')
                        break;
                }
            }
            if (trimeste == 'segundo') {
                switch (notaDe) {
                    case "avaliacao1":
                        //return res.send("Lançar nota no segungo trimestre - av1")
                        notaTrimestral.av1T2 = nota
                        break;
                    case "avaliacao2":
                        // return res.send("Lançar nota no segungo trimestre - av2")
                        notaTrimestral.av2T2 = nota

                        break;
                    case "avaliacao3":
                        //   return res.send("Lançar nota no segungo trimestre - av3")
                        notaTrimestral.av3T2 = nota

                        break;
                    case "provaDoProfessor":
                        //   return res.send("Lançar nota no segungo trimestre - av3")
                        notaTrimestral.pp2 = nota

                        break;
                    case "provaDoTrimestre":
                        //   return res.send("Lançar nota no segungo trimestre - av3")
                        notaTrimestral.pt2 = nota

                        break;

                    default:
                        return res.send('Selecione os campos correctamente!')

                        break;
                }
            }
            if (trimeste == 'terceiro') {
                switch (notaDe) {
                    case "avaliacao1":
                        //return res.send("Lançar nota no terceiro trimestre - av1")
                        notaTrimestral.av1T3 = nota
                        break;
                    case "avaliacao2":
                        // return res.send("Lançar nota no terceiro trimestre - av2")
                        notaTrimestral.av2T3 = nota

                        break;
                    case "avaliacao3":
                        //   return res.send("Lançar nota no terceiro trimestre - av3")
                        notaTrimestral.av3T3 = nota

                        break;
                    case "provaDoProfessor":
                        //   return res.send("Lançar nota no terceiro trimestre - av3")
                        notaTrimestral.pp3 = nota

                        break;
                    case "provaDoTrimestre":
                        //   return res.send("Lançar nota no terceiro trimestre - av3")
                        notaTrimestral.pt3 = nota

                        break;

                    default:
                        return res.send('Selecione os campos correctamente!')

                        break;
                }
            }
            if (trimeste == 'outro') {
                switch (notaDe) {
                    case "provaOral":
                        //return res.send("Lançar nota de prova oral, final ou exame")
                        notaTrimestral.pOral = nota
                        break;
                    case "exame":
                        // return res.send("Lançar nota de prova oral, final ou exame")
                        notaTrimestral.examePF = nota

                        break;

                    default:
                        return res.send('Selecione os campos correctamente!')

                        break;
                }
            }
            const notasTrimCread = await createNotaTrimestral(notaTrimestral)
            novaNotasDoaluno.notas = notasTrimCread._id
            const notasDoAlunoCriada = await createNotasDisciplinaService(novaNotasDoaluno)
            //return res.send({ notasDoAlunoCriada })
            req.flash('success_msg', 'Nota lançada com exito!')
            res.redirect("/professor/minipauta/" + idMinipauta)
        } else {
            const idNotaAch  = notasAchada._id
            const notasExist = await findNotasExistentByIdService(idNotaAch)
            if(notasExist){
                //return res.send('Actualizar as notas do auno!')
                if (trimeste == 'primeiro') {
                    switch (notaDe) {
                        case "avaliacao1":
                            //return res.send("Lançar nota no primeiro trimestre - av1")
                            notasExist.av1T1 = nota
                            break;
                        case "avaliacao2":
                            // return res.send("Lançar nota no primeiro trimestre - av2")
                            notasExist.av2T1 = nota
    
                            break;
                        case "avaliacao3":
                            //   return res.send("Lançar nota no primeiro trimestre - av3")
                            notasExist.av3T1 = nota
    
                            break;
                        case "provaDoProfessor":
                            //   return res.send("Lançar nota no primeiro trimestre - av3")
                            notasExist.pp1 = nota
    
                            break;
                        case "provaDoTrimestre":
                            //   return res.send("Lançar nota no primeiro trimestre - av3")
                            notasExist.pt1 = nota
    
                            break;
    
                        default:
                            return res.send('Selecione os campos correctamente!')
                            break;
                    }
                }
                if (trimeste == 'segundo') {
                    switch (notaDe) {
                        case "avaliacao1":
                            //return res.send("Lançar nota no segungo trimestre - av1")
                            notasExist.av1T2 = nota
                            break;
                        case "avaliacao2":
                            // return res.send("Lançar nota no segungo trimestre - av2")
                            notasExist.av2T2 = nota
    
                            break;
                        case "avaliacao3":
                            //   return res.send("Lançar nota no segungo trimestre - av3")
                            notasExist.av3T2 = nota
    
                            break;
                        case "provaDoProfessor":
                            //   return res.send("Lançar nota no segungo trimestre - av3")
                            notasExist.pp2 = nota
    
                            break;
                        case "provaDoTrimestre":
                            //   return res.send("Lançar nota no segungo trimestre - av3")
                            notasExist.pt2 = nota
    
                            break;
    
                        default:
                            return res.send('Selecione os campos correctamente!')
    
                            break;
                    }
                }
                if (trimeste == 'terceiro') {
                    switch (notaDe) {
                        case "avaliacao1":
                            //return res.send("Lançar nota no terceiro trimestre - av1")
                            notasExist.av1T3 = nota
                            break;
                        case "avaliacao2":
                            // return res.send("Lançar nota no terceiro trimestre - av2")
                            notasExist.av2T3 = nota
    
                            break;
                        case "avaliacao3":
                            //   return res.send("Lançar nota no terceiro trimestre - av3")
                            notasExist.av3T3 = nota
    
                            break;
                        case "provaDoProfessor":
                            //   return res.send("Lançar nota no terceiro trimestre - av3")
                            notasExist.pp3 = nota
    
                            break;
                        case "provaDoTrimestre":
                            //   return res.send("Lançar nota no terceiro trimestre - av3")
                            notasExist.pt3 = nota
    
                            break;
    
                        default:
                            return res.send('Selecione os campos correctamente!')
    
                            break;
                    }
                }
                if (trimeste == 'outro') {
                    switch (notaDe) {
                        case "provaOral":
                            //return res.send("Lançar nota de prova oral, final ou exame")
                            notasExist.pOral = nota
                            break;
                        case "exame":
                            // return res.send("Lançar nota de prova oral, final ou exame")
                            notasExist.examePF = nota
    
                            break;
    
                        default:
                            return res.send('Selecione os campos correctamente!')
    
                            break;
                    }
                }

                //CÁLCULOS DAS MÉDIAS - MAC MT1, MT2, MT3, MT, CF
                
                
                //return res.send('Actualozação das notas do aluno')
                const notasUpdate = await findNotaByIdAndUpdateSerice(idNotaAch, notasExist)
                const mediasActulizadas = await calcularMedias(idNotaAch)
                // return res.send({mediasActulizadas})
                req.flash('success_msg', 'Nota lançada com exito!')
            res.redirect("/professor/minipauta/" + idMinipauta)
            }else{
                return res.send('As notas do aluno foram apagadas do sistea')

            }
        }

    } catch (error) {
        res.status(500).send({ mesage: error.mesage })
    }
}

export const config = async (req, res) => {
    try {
        res.send("Testar config...")
    } catch (error) {

    }
}