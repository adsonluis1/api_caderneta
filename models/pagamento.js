import { connect } from "../db/conn.js";

export class PagamentoModels {
    #valor
    #devedor
    #divida

    constructor(valor,devedor,divida){
        this.#valor = valor
        this.#devedor = devedor
        this.#divida = divida
    }

    async save (){
        let sqlCreatePay = `INSERT INTO pagamento (valor,devedor,divida) VALUES (?,?,?)`
        let dataCreatePay = [this.#valor,this.#devedor,this.#divida]
        
        let sqlLessValor = `UPDATE devedor SET valor = valor - ? WHERE _id = ?`
        let dataLessValor = [this.#valor,this.#devedor]

        let sqlGetValorDivida = `SELECT * FROM divida WHERE _id = ?`
        let dataGetValorDivida = [this.#divida]

        let sqlPayAll = `UPDATE divida SET valor = 0, pago = ? WHERE _id = ?`
        let dataPayAll = [1,this.#divida]
        
        let sqlPay = `UPDATE divida SET valor = valor - ? WHERE _id = ?`
        let dataPay = [this.#valor,this.#divida]


        try {
            await connect.beginTransaction()

            await connect.execute(sqlCreatePay,dataCreatePay)
            await connect.execute(sqlLessValor, dataLessValor)
            let [divida] = await connect.execute(sqlGetValorDivida, dataGetValorDivida)    
            if(divida[0].valor <= this.#valor){
                await connect.execute(sqlPayAll, dataPayAll)
            } else {
                await connect.execute(sqlPay, dataPay)
            }

            await connect.commit()
        } catch (error) {
            console.log(error)
            throw error
        }

    }

}