import express from 'express'
import {DevedoresControllers as Controllers} from "../controllers/devedores.js"
export const app = express.Router()

app.get('/', Controllers.getDevedores)
app.get('/divida/:devedorId', Controllers.getDevedoresDividas)
app.get('/pagamento/:devedorId', Controllers.getDevedoresPagamentos)
app.post('/save', Controllers.saveDevedor)
app.patch('/editar', Controllers.changeInfoDevedores)
app.put('/desativar/:devedorId' , Controllers.deleteDevedor)
app.put('/ativar/:devedorId' , Controllers.ativarDevedor)
