require('dotenv').config();
const jwt = require('jsonwebtoken');

class TokenJwt{
  static createToken(user, expiresIn = '60m'){
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn });
  }
  
  static verifyToken(token){
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = { TokenJwt };
