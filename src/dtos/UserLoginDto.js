const { TokenJwt } = require("../utils")

class UserLoginDto{
    constructor(user){
        this.token = TokenJwt.createToken(user, '8h');
        this.usuario = {
            id: user.id,
            nome: user.nome,
            email: user.email
        }
    }
}

module.exports = { UserLoginDto };