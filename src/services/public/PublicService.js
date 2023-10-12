const { pool } = require('../../connection');
const { UserLoginDto } = require('../../dtos');
const { PasswordHash } = require('../../utils');

class PublicService{
    static async createUser({ nome, email, senha }){
        return (await pool.query('insert into usuarios (nome, email, senha) values($1, $2, $3) returning id, nome, email;', [nome, email, await PasswordHash.translateToHash(senha)])).rows;
    }

    static async login({ email, senha }){
        const user = (await pool.query('select * from usuarios where email=$1', [email])).rows.at(0);
        const isValid = await PasswordHash.compareHash(senha, user.senha);

        if(isValid)
            return new UserLoginDto(user);

        return {};
    }
}

module.exports = { PublicService };