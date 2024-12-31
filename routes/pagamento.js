import express from "express";
import {PagamentoControllers as Controllers} from "../controllers/pagamento.js"
import {checkJWT} from "../midlewares/midlewares.js"
export const app = express.Router()

app.post('/pagar',checkJWT, Controllers.pagar)
