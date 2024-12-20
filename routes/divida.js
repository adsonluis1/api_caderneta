import express from "express"
import {DividaControllers as Controllers} from "../controllers/divida.js"
export const app = express.Router()

app.post('/adicionar',Controllers.adicionarDivida)