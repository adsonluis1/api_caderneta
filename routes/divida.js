import express from "express"
import {DividaControllers as Controllers} from "../controllers/divida.js"
import {checkJWT} from "../midlewares/midlewares.js"
export const app = express.Router()

app.post('/adicionar',checkJWT,Controllers.adicionarDivida)