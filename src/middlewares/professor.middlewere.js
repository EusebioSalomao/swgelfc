import { findNotaByIdAndActulizeMedias, findNotasExistentByIdService } from "../services/notas.service.js"

export const verifyLancamento = (req, res, next) =>{
    try {
        const idAluno = req.body.aluno
        const idProfessor = req.body.idProfessor
        const idMinipauta = req.body.idMinipauta
        const idClasse = req.body.idClasse
        
        const trimeste = req.body.trimestre
        const notaDe = req.body.notaDe
        const nota = req.body.nota
        
        
        if(idAluno == 'selecionar'){
            req.flash('error_msg', 'Não foi selecionado o aluno')
            res.redirect("/professor/minipauta/"+idMinipauta)
        }
        if(trimeste == 'selecionar'){
            req.flash('error_msg', 'Não foi selecionado o trimestre')
            res.redirect("/professor/minipauta/"+idMinipauta)
        }
        if(notaDe == 'selecionar'){
            req.flash('error_msg', 'Informe se é nota de: Avalição continua ou prova')
            res.redirect("/professor/minipauta/"+idMinipauta)
        }
        /* //return res.send(nota)
        if(nota < 0 || nota > 20){
            req.flash('error_msg', 'Insere uma nota maior ou igual a 0 (zero) e não superior a 20 (vinte)')
            res.redirect("/professor/minipauta/"+idMinipauta)
        } */
        next()

    } catch (error) {
        res.status(500).send({mesage: error.mesage})
    }
}

export const calcularMedias = async (idNotaAch) => {
    try {
        const test = 'Sucesso!'
        const notas = await findNotasExistentByIdService(idNotaAch)
        //primeiro trimestre
        const totalAvT1 = []
        if(notas.av1T1 != null){
            totalAvT1.push(notas.av1T1)
        }
        if(notas.av2T1 != null){
            totalAvT1.push(notas.av2T1)
        }
        if(notas.av3T1 != null){
            totalAvT1.push(notas.av3T1)
        }
        let somaMac1 = 0
        totalAvT1.forEach(element => {
            somaMac1 += element 
        });
        let mediaMac1 = somaMac1 / totalAvT1.length
        notas.mac1 = Math.round(mediaMac1)
        let somaNT1 = 0
        let MediaSomaNT1 = 0
        if(notas.pp1 != null && notas.pt1 != null){
            somaNT1 = notas.pp1 + notas.pt1 + notas.mac1
            MediaSomaNT1 = somaNT1 / 3
            notas.mt1 = Math.round(MediaSomaNT1)
        }
        /* 
        //SEGUNDO TRIMESTRE
        const totalAvT2 = []
        if(notas.av1T2 != null){
            totalAvT2.push(notas.av1T2)
        }
        if(notas.av2T2 != null){
            totalAvT2.push(notas.av2T2)
        }
        if(notas.av3T2 != null){
            totalAvT2.push(notas.av3T2)
        }
        let somaMac2 = 0
        totalAvT2.forEach(element => {
            somaMac2 += element 
        });
        let mediaMac2 = somaMac2 / totalAvT2.length
        notas.mac2 = Math.round(mediaMac2)
        //console.log('o tipo do mac2: '+typeof notas.mac2)
        let somaNT2 = 0
        let MediaSomaNT2 = 0
        if(notas.pp2 != null && notas.pt2 != null){
            somaNT2 = notas.pp2 + notas.pt2 + notas.mac2
            MediaSomaNT2 = somaNT2 / 3
            notas.mt2 = Math.round(MediaSomaNT2)
        }
        
        //return test
        //TERCEIRO TRIMESTRE
        const totalAvT3 = []
        if(notas.av1T3 != null){
            totalAvT3.push(notas.av1T3)
        }
        if(notas.av2T3 != null){
            totalAvT3.push(notas.av2T3)
        }
        if(notas.av3T3 != null){
            totalAvT3.push(notas.av3T3)
        }
        let somaMac3 = 0
        totalAvT3.forEach(element => {
            somaMac3 += element 
        });
        let mediaMac3 = somaMac3 / totalAvT3.length
        notas.mac3 = Math.round(mediaMac3)
        let somaNT3 = 0
        let MediaSomaNT3 = 0
        if(notas.pp3 != null && notas.pt3 != null){
            somaNT3 = notas.pp3 + notas.pt3 + notas.mac3
            MediaSomaNT3 = somaNT3 / 3
            notas.mt3 = Math.round(MediaSomaNT3)
        }
        
        */
        //MÉDIAS FINAIS

        //Média dos tres trimestres
        const medDosTrimestre = []
        if(notas.mt3 != null){
            if(notas.mt1 != null){
                medDosTrimestre.push(notas.mt1)
            }
            if(notas.mt2 != null){
                medDosTrimestre.push(notas.mt2)
            }
            if(notas.mt3 != null){
                medDosTrimestre.push(notas.mt3)
            }
            let somaDasMedTrimestrais = 0
            medDosTrimestre.forEach(element => {
                somaDasMedTrimestrais += element
            });
            const med3T = somaDasMedTrimestrais / 3
            notas.medDosTrimestes = Math.round(med3T)
        }

        //Classificação final (40% das medias do trimestre + 60% do exame)
        let mediaTrim40pPorcento = 0
        let exame60Porcento = 0
        if(notas.examePF != null){
            mediaTrim40pPorcento = notas.medDosTrimestes * 0.4
            exame60Porcento = notas.examePF * 0.6
            const medTrimMaisExame40e60Porcento = mediaTrim40pPorcento + exame60Porcento
            notas.cf = Math.round(medTrimMaisExame40e60Porcento)
        } 

        const notasActuais = await findNotaByIdAndActulizeMedias(idNotaAch, notas)
        return notasActuais
    } catch (error) {
        console.log(error)
        return error.mesage
    }
}