import express from "express"
import session from "express-session"
import flash from 'connect-flash'
import passport from 'passport'
import fileUpload from "express-fileupload"
import fs from 'fs'
import cors from 'cors'

import handlebars from  'express-handlebars'
import path from 'path'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
const port = 8081
import connectDB from  "./src/database/db.js"
const app = express()

//Importação das rotas
    //import homeRouter from './src/routes/home.router.js'
    import candidatoRouter from './src/routes/candidato.router.js'
    import cursoRouter from "./src/routes/curso.router.js"
    import alunoRouter from './src/routes/alunos.router.js'
    import anoLectivoRouter from "./src/routes/anolectivo.router.js"
    import classeRouter from './src/routes/classe.router.js'
    import turmaRouter from './src/routes/turma.router.js'
    import disciplinaRouter from './src/routes/disciplina.router.js'
    import funcionarioRouter from './src/routes/funcionario.router.js'
    import adminRouter from './src/routes/admin.router.js'
    import professorRouter from './src/routes/professor.router.js'
    import pedagogicoRouter from './src/routes/pedagogico.router.js'
    import homeRouter from './src/routes/home.router.js'
//import userRouters from './src/routes/user.routes.js'


//Configurações
//sessão
app.use(session({
    secret: 'tfcispb2023',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//conf middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    next()
})
/* 
app.use(session({secret: 'nnbcnvbnxbnm,nd,fm,bx,mbnmbnmvnm'}));
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp')
}));  */
app.use(cors());


//Confi
//Tamplate
    /* app.engine('handlebars', handlebars.engine({defaultLayout: "main"}))
    app.set("view engine", 'handlebars') */

    //NOVA CONFIGURÇÃO
        app.use(express.static(__dirname + '/public'));

        app.engine("handlebars", handlebars.engine({
            defaultLayout: "main",
            layoutsDir: path.join(__dirname, "views", "layouts")
        }));
        app.set("view engine", "handlebars");
        app.set("views", path.join(__dirname, "views"))
    //Conectar BD
   connectDB()

//Body Parser
import bodyParser from 'body-parser'
import router from "./src/routes/user.routes.js"
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


//Diretorio de css e Js
//app.use(express.static(path.join("public")))
//app.use(express.static(path.join(__dirname, 'public')))

//ROTAS
        //PRINCIPAL
        app.get('/', (req, res) =>{
            res.send('testar upload')
        })
        
        app.use('/', homeRouter)

        //Usuário - rotas
        app.use('/user', router)
        
        //Candidatos
        app.use('/candidatos', candidatoRouter)

        //Cursos
        app.use('/cursos', cursoRouter)

        //Alunos
        app.use('/alunos', alunoRouter)

        app.use('/anosLectivo', anoLectivoRouter)
        app.use('/classes', classeRouter)
        app.use('/turmas', turmaRouter)
        app.use('/disciplinas', disciplinaRouter)
        app.use('/funcionarios', funcionarioRouter)
        app.use('/admin', adminRouter)
        app.use('/pedagogico', pedagogicoRouter)
        app.use('/professor', professorRouter)



app.listen(port, () => console.log("Servidor SWGELFC rodando..."))