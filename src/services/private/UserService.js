const { pool } = require('../../connection');
const { PasswordHash } = require('../../utils');

class UserService{
    static async getUser({ id: userId }){
        try{
            return (await pool.query(`
                select id, nome, email 
                from usuarios 
                where id=$1
            `, [userId])).rows.at(0);
        } catch(error){
            throw error;
        }
    }

    static async updateUser({ nome, email, senha }, { id: userId }){
        try{
            return (await pool.query(`
                update usuarios 
                set nome=$1, email=$2, senha=$3 
                where id=$4;
            `, [nome, email,  await PasswordHash.translateToHash(senha), userId])).rowCount;
        } catch(error){
            throw error;
        }
    }
}

module.exports = { UserService };