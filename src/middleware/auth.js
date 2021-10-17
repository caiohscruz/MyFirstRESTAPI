function auth(req, res, next) {

    const jwt = require("jsonwebtoken")
    const jwtSecret = process.env.JWTSECRET

    /* autenticação fica de lado por enquanto 

    const authToken = req.headers["authorization"]

    if (authToken != undefined) {
        const token = authToken.split(" ")[1]

        jwt.verify(token, jwtSecret, (err, data)=>{
            if(err){
                res.status(401)
                res.json({
                    err: "Token inválido"
                })
            }else{
                req.token = token
                req.loggedUser= {id: data.id, username: data.username}
                next()
            }
        })

    } else {
        res.status(401)
        res.json({
            err: "Token inválido"
        })
    }

    */

    next();
}

module.exports = auth