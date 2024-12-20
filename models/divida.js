import { connect } from "../db/conn.js";

export class DividaModels {
    #devedor
    #valor
    #itens
    constructor (devedor,valor,itens){
        this.#devedor = devedor
        this.#valor = valor
        this.#itens = itens
    }

    async save (){
        let sqlSaveDivida = `INSERT INTO divida (devedor,valor) VALUES (?,?)`
        let dataDivida = [this.#devedor,this.#valor]
        let sqlUpdateDevedor = `UPDATE devedor SET valor = valor + ? WHERE _id = ?`
        let sqlCreateItemComprado = `INSERT INTO itemComprado (item,quantidade,divida) VALUES (?,?,?)`

        try {
            await connect.beginTransaction()

            const [divida] = await connect.execute(sqlSaveDivida,dataDivida)
            
            this.#itens.map(async (item)=>{
                await connect.execute(sqlCreateItemComprado,[item.nome,item.quantidade,divida.insertId])
            })

            await connect.execute(sqlUpdateDevedor,[this.#valor,this.#devedor])
            
            await connect.commit()
        } catch (error) {
            console.log(error)
            await connect.rollback()
            throw error
        }
    }
}