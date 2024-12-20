import mysql from "mysql2/promise"

export const connect = await mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456@Adson",
    database:"carderneta"
})