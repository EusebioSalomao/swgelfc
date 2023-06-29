import localStrategy from 'passport-local'
import bcrypt from 'bcryptjs'

//Model de usuario
import Usuario from '../models/user.modles.js'



export const authMidleware = function(passport){

    passport.use(new localStrategy({usernameField: 'username', passwordField: 'senha'}, (username, senha, done)=>{
        Usuario.findOne({username: username}).then((usuario)=>{
            if(!usuario){
                return done(null, false, {message: 'Esta conta não existe!'})
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) =>{
                if(batem){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: 'senha ou usuário errado!'})
                }
            })
        })
    }))

    passport.serializeUser((usuario, done)=>{
        done(null, usuario.id)
    })
    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) =>{
            done(err, usuario)
        })
    })
}