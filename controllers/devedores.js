import {DevedoresModels as Models} from '../models/devedores.js'

export class DevedoresControllers {
    static async saveDevedor (req,res){
        const {nome,valor,email,cpf,numero} = req.body
        const {timeOut} = req.locals
        
        try {
            const devedor = new Models(nome,valor,email,cpf,numero)
            await devedor.save()
            res.status(201).json({message:"Devedor criado com sucesso",timeOut})
        } catch (error) {
            console.log(error)
            res.status(400).json({message:"Erro ao criar o devedor"})
        }
    }

    static async deleteDevedor (req,res){
        const {devedorId} = req.params
        const {timeOut} = req.locals

        try {
            await Models.delete(devedorId)
            res.json({message:"Devedor excluido com sucesso",timeOut})
        } catch (error) {
            console.log(error)
            res.status(400).json({message:"Erro ao desativar o devedor"})
        }
    }

    static async ativarDevedor (req,res){
        const {devedorId} = req.params
        const {timeOut} = req.locals

        try {
            await Models.ativar(devedorId)
            res.json({message:"Devedor ativo com sucesso", timeOut})
        } catch (error) {
            console.log(error)
            res.status(400).json({message:"Erro ao ativar o devedor"})
        }
    }

    static async getDevedores (req,res){
        const {timeOut} = req.locals

        try {
            const [devedores] = await Models.getDevedores()
            res.json({...devedores,timeOut})
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    static async getDevedoresDividas (req,res){
        const {devedorId} = req.params
        const {timeOut} = req.locals

        try {
            let [devedor] = await Models.getDevedorById(devedorId)
            
            if(!devedor){
                throw new Error("Devedor não encontrado")
            }

            devedor = devedor[0]

            let [dividas] = await Models.getDividasDevedores(devedorId)

            devedor["dividas"] = dividas

            res.json({...devedor,timeOut})
        } catch (error) {
            console.log(error)
            res.status(400).json({message:error.message})            
        }
    }

    static async getDevedoresPagamentos (req,res){
        const {devedorId} = req.params
        const {timeOut} = req.locals

        try {
            let [devedor] = await Models.getDevedorById(devedorId)

            if(!devedor){
                throw new Error("Devedor não encontrado")
            }

            devedor = devedor[0]

            const [pagamentos] = await Models.getPagamentosDevedores(devedorId)
            devedor["pagamentos"] = pagamentos

            res.json({...devedor,timeOut})
        } catch (error) {
            console.log(error)
            res.status(400).json({message:error.message})    
        }
    }

    static async changeInfoDevedores (req,res){
        const {devedorId,nome,email,cpf,numero} = req.body
        const {timeOut} = req.locals

        try {
            await Models.changeDevedoresInfo(devedorId,nome,cpf,email,numero)
            res.json({message:"Devedor alterado com sucesso",timeOut})
        } catch (error) {
            console.log(error)
            res.status(400).json({message:error.message})      
        }
    }
}