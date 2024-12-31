import { UsuarioModels as Models } from "../models/usuarios.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

async function checkUser(password,hashPassWord) {
    return await bcrypt.compare(password, hashPassWord);
}

export class UsuariosControllers {
    
    static async adicionar (req,res){
        const {nome,senha,email} = req.body
        let statusCode = 201

        try {
            if(!nome || !senha){
                statusCode = 400
                throw new Error ("Dados requiridos não enviados")
            }

            let [usuario] = await Models.getUserExistentByNome(nome)

            if(usuario){
                statusCode = 400
                throw new Error("Usuario ja existente")
            }

            let senhaHash

            try {
                senhaHash = bcrypt.hashSync(senha,10)
            } catch (error) {
                statusCode = 501
                throw new Error('Error ao criptografar senha')
            }

            const newUsuario = new Models(nome,senhaHash,email)

            await newUsuario.save()

            res.status(statusCode).json({message:"Usuario criada com sucesso"})
        } catch (error) {
            res.status(statusCode).json({message:error.message})            
        }
    }

    static async login (req,res){
        const {nome, senha} = req.body 
        let statusCode = 200
        let privateKey = process.env.SECRETKEY

        try {   
            let [usuario] = await Models.getUserExistentByNome(nome)    

            if(!usuario){
                statusCode = 400
                throw new Error("Usario não existe")
            }

            const done = await checkUser(senha,usuario.senha)

            if(!done){
                throw new Error("Senha incorreta")
            }

            delete usuario.senha

            let token = jwt.sign({userId:usuario._id}, privateKey,{expiresIn:"1h"})


            res.json({...usuario,token})

        } catch (error) {
            res.status(statusCode).json({message:error.message})
        }
    }

    static async refreshJWT (req,res){
        const {idUser} = req.body
        const {timeOut} = req.locals
        let statusCode = 200
        const secretKey = process.env.SECRETKEY

        try {

            if(!timeOut){
                statusCode = 400
                throw new Error("Ainda não chegou no tempo minimo para atualizar o JWT")
            }

            const done = await Models.checkExistentUserById(idUser)

            if(!done){
                statusCode = 400
                throw new Error("Id passado invalido")
            }
            
            const newToken = jwt.sign({userId:idUser},secretKey)

            res.status(statusCode).json(newToken)
        } catch (error) {
            console.log(error)
            res.status(statusCode).json({message:error.message})
        }

    }

}
