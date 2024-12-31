import {connect} from "../db/conn.js"

export class UsuarioModels {
    #nome
    #senha
    #email

    constructor(nome,senha,email){
        this.#nome = nome
        this.#senha = senha
        this.#email = email
    }

    async save (){
        let sqlSaveUser = `INSERT INTO usuario (nome,senha,email) VALUES (?,?,?)`
        let dataSaveUser = [this.#nome,this.#senha,this.#email]

        try {
            await connect.execute(sqlSaveUser, dataSaveUser)
        } catch (error) {
            throw error
        }
    }
    
    static async getUserExistentByNome (userName){
        let sqlGet = `SELECT * FROM usuario WHERE nome = ?`
        
        try {
            const [usuario] = await connect.execute(sqlGet,[userName])

            return usuario
        } catch (error) {
            throw error
        }

    }

    static async getUserExistentByEmail (email){
        let sql =  `SELECT * FROM usuario WHERE email = ?`

        try {
           const [usuario] = await connect.execute(sql,[email])
           return usuario
        } catch (error) {
            throw error
        }
    }

    static async checkExistentUserById (idUser){
        let sql = `SELECT * FROM usuario WHERE _id = ?`

        try {
            const [usuario] = await connect.execute(sql,[idUser])
            return usuario.length >= 1
        } catch (error) {
            throw error
        }
    }
}