

module.exports = function auth(req, res, next) {
    let {user} = req.body
    if(user === "user1") {
        return next()
    } 
    else {
        res.status(401).send("Usuario no autorizado")
    }
}