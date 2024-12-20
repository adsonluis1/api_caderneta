import {DividaModels as Models} from '../models/divida.js'
import {DevedoresModels} from "../models/devedores.js"

export class DividaControllers {
    static async adicionarDivida (req,res){
        const {devedorId,valor,item,quantidade} = req.body
        
        try {
            const [devedor] = await DevedoresModels.getDevedorById(devedorId)

            if(!devedor){
                throw new Error("Devedor inexistente")
            }

            const divida = new Models(devedorId,valor,item,quantidade)
            await divida.save() // essa função alem de criar a divida ela adiciona o valor na tabela de devedores 
            res.status(200).json({message:"Divida adicionada ao usuario com sucesso"})
        } catch (error) {
            console.log(error)
            res.status(400).json({message:error.message})
        }
    }


}

