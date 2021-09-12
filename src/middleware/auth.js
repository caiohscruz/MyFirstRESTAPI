function auth(req, res, next){
    
    const authToken = req.headers["authorization"]
    console.log(authToken)
    next()
    
}

module.exports = auth