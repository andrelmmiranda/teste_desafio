const bcrypt = require('bcrypt');

class PasswordHash{
  static async translateToHash(password){
    try{
      return await bcrypt.hash(password, 10);
    } catch(error){
      console.error(error.message);
    }
  }

  static async compareHash(password, passwordHash){
    try{
      return await bcrypt.compare(password, passwordHash);
    } catch(error){
      console.error(error.message);
    }
  }
}

module.exports = { PasswordHash };
