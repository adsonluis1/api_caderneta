import express from "express";
import {PagamentoControllers as Controllers} from "../controllers/pagamento.js"
export const app = express.Router()

app.post('/pagar', Controllers.pagar)
