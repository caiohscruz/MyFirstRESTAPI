function auth(req, res, next) {

    const jwt = require("jsonwebtoken")
    const jwtSecret = process.env.JWTSECRET

    const authToken = req.headers["authorization"]

    if (authToken != undefined) {
        authToken = authToken.split(" ")[1]

        jwt.verify(authToken, jwtSecret, (err, data)=>{
            if(err){
                res.status(401)
                res.json({
                    err: "Token inválido"
                })
            }else{
                req.token = authToken
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

}

module.exports = auth