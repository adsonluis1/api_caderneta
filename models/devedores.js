import {connect} from "../db/conn.js"

export class DevedoresModels {
    #nome
    #valor
    #email
    #cpf
    #numero
    constructor(nome,valor,email = null,cpf=null,numero=null){
        this.#nome = nome
        this.#valor = valor
        this.#email = email
        this.#cpf = cpf
        this.#numero = numero
    }

    async save (){
        let sqlSaveDevedor = `INSERT INTO devedor (nome,valor,email,cpf,numero) VALUES (?,?,?,?,?)`
        let dataDevedor = [this.#nome,this.#valor,this.#email,this.#cpf,this.#numero]
        let sqlSaveDivida = `INSERT INTO divida (devedor,valor,item,quantidade) VALUES (?,?,?,?)`
        try {
            await connect.beginTransaction()
            
            const [result] = await connect.execute(sqlSaveDevedor,dataDevedor)
            let dataDivida = [result.insertId,this.#valor,"Divida adicionada sem detalhes",1]
            await connect.execute(sqlSaveDivida,dataDivida)
            
            await connect.commit()
        } catch (error) {
            console.log(error)
            await connect.rollback()
            throw error
        }
    }

    static async delete (devedorId){
        let sql = `UPDATE devedor SET ativo = false where _id = ?`
        try {
            await connect.execute(sql,[devedorId])
        } catch (error) {
            throw error
        }
    }

    static async ativar (devedorId){
        let sql = `UPDATE devedor SET ativo = true WHERE _id = ?`
        try {
            await connect.execute(sql,[devedorId])
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async getDevedorById (devedorId){
        let sql = `SELECT * FROM devedor WHERE _id = ?`
        try {
            return await connect.execute(sql,[devedorId])
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async getDevedores (){
        let sql = `SELECT _id,nome,ativo,valor,email,cpf,numero FROM devedor ORDER BY nome, ativo`

        try {
            return await connect.query(sql)
        } catch (error) {
            throw error
        }
    }

    static async getDividasDevedores (devedorId){
        let sql = `
            SELECT t1._id,t1.dataFeita,t1.pago,t1.valor,
json_arrayagg(
	json_object(
		"_id", t2._id,
        "quantidade",t2.quantidade,
        "item",t2.item
    )
) as itens  
FROM divida t1
INNER JOIN itemcomprado t2
ON t1._id = t2.divida
WHERE t1.devedor = ?
GROUP BY t1._id,t1.devedor,t1.dataFeita,t1.pago,t1.valor
ORDER BY t1.pago
        `

        try {
            return await connect.execute(sql,[devedorId])
        } catch (error) {
            throw error
        }
    }

    static async getPagamentosDevedores (devedorId){
        let sql = `SELECT _id,dataFeito,valor,divida FROM pagamento WHERE devedor = ?`

        try {
            return await connect.execute(sql, [devedorId])   
        } catch (error) {
            throw error
        }
    }

    static async changeDevedoresInfo(devedorId,nome,cpf,email,numero){
        let sql = `UPDATE devedor SET nome = ?,cpf = ?, email = ?, numero= ? WHERE _id = ?`
        let data = [nome,cpf,email,numero,devedorId]

        try {
            await connect.execute(sql,data)
        } catch (error) {
            throw error
        }
    }

}