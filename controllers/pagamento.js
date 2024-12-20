import {PagamentoModels as Models} from '../models/pagamento.js'

export class PagamentoControllers {
    static async pagar (req,res){
        const {valor,devedorId,dividaId} = req.body

        try {
            const pay= new Models(valor,devedorId,dividaId)
            await pay.save()

            res.status(201).json({message:"Pagamento efetuado"})
        } catch (error) {
            console.log(error)
            res.status(400).json({message:"Pagamento não foi efetuado"})
        }
    }
}