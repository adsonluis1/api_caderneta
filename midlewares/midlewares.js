import jwt from "jsonwebtoken"

export function checkJWT (req,res,next){
    const token = req.headers["x-access-token"]
    const secretKey = process.env.SECRETKEY

    try {
        const done = jwt.verify(token,secretKey)
        
        if(done){
            req.locals = req.locals || {}
            const now = Math.floor(Date.now() / 1000)
            let tempRestante = (done.exp - now) // tempo restante em segundos
            req.locals.timeOut = false

            if(tempRestante <= 600){
               req.locals.timeOut = true
            }
        
            next()
        }else {
           return res.status(400).json({message:"Token invalido"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}