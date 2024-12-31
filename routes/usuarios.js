import {UsuariosControllers as Controllers} from '../controllers/usuarios.js'
import express from 'express'
import {checkJWT} from "../midlewares/midlewares.js"
export const app = express.Router()

app.post('/adicionar', Controllers.adicionar)
app.post('/login', Controllers.login)
app.post('/refreshJWT', checkJWT, Controllers.refreshJWT)

