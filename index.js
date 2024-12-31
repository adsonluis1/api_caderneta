import express from "express"
import {app as routeDevedores} from "./routes/devedores.js"
import {app as routeDivida} from "./routes/divida.js"
import {app as routePagamento} from './routes/pagamento.js'
import {app as routeUsuarios} from './routes/usuarios.js'
import "dotenv/config"
import { connect } from "./db/conn.js"

const app = express()

app.use(express.json())
app.use('/devedores',routeDevedores)
app.use('/divida',routeDivida)
app.use('/pagamento', routePagamento)
app.use('/usuarios', routeUsuarios)

app.listen('3333',()=>{
    try {
        connect.connect()
        console.log('rodando')
        console.log('banco conectado')
    } catch (error) {
        console.log(error)
    }
})