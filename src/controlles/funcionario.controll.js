import { createFuncionarioService, findAllFuncionariosService, findFuncionarioByNumBIService } from "../services/funcionario.service.js"
import { createUserService } from "../services/user.service.js"

export const tdFuncionarios = async (eq, res) => {
    try {
        const funcionarios = await findAllFuncionariosService()
        return res.send({funcionarios})
        res.render('admin/funcionarios/funcionarios', {funcionarios})
    } catch (error) {
        res.status(500).send({mesage: error.mesage})
    }
}

export const addFuncionario = async (req, res) => {
    try {

        res.render("admin/funcionarios/cadFuncionario")
    } catch (error) {
        res.status(500).send({mesage: error.mesage})
    }
}

export const saveFuncionario = async (req, res) => {
    try {
        const funcionario = req.body
        const verifF = await findFuncionarioByNumBIService(funcionario.numBI)
        if(verifF){
            req.flash('error_msg', 'Este número do BI já está cadastrado no sistema')
            res.redirect('/funcionarios/add')
        }else{
            const nome = req.body.nome
            const numBilhete = req.body.numBI
            const num = numBilhete.slice(5, 8)
            console.log(num)
            const nomeArray = nome.split(" ")
            const username0 = nomeArray[0]+'@ngunga'+num+'.'+nomeArray[1]
            const username = username0.toLocaleLowerCase()

            //return res.send({username})
            const novoUsuario = {
                username: username,
                senha: req.body.numBI,
                telefone: req.body.contacto,
                categoria: req.body.funcao
            }
            const userFuncionario = await createUserService(novoUsuario)
            funcionario.usuario = userFuncionario._id
            const novoF = await createFuncionarioService(funcionario)
            req.flash('success_msg', 'Funcionario cadastrado com sucesso!')
            res.redirect('/funcionarios')
        }
    } catch (error) {
        res.status(500).send({mesage: error.mesage})
    }
}