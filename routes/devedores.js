import express from 'express'
import {checkJWT} from "../midlewares/midlewares.js"
import {DevedoresControllers as Controllers} from "../controllers/devedores.js"
export const app = express.Router()

app.get('/', checkJWT,Controllers.getDevedores)
app.get('/divida/:devedorId', checkJWT,Controllers.getDevedoresDividas)
app.get('/pagamento/:devedorId',checkJWT, Controllers.getDevedoresPagamentos)
app.post('/save',checkJWT, Controllers.saveDevedor)
app.patch('/editar',checkJWT, Controllers.changeInfoDevedores)
app.put('/desativar/:devedorId' ,checkJWT, Controllers.deleteDevedor)
app.put('/ativar/:devedorId' ,checkJWT, Controllers.ativarDevedor)
