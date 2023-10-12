const { pool } = require('../../connection');

class CategoryService{
    static async getCategories(){
        try{
            return (await pool.query(`
                select * 
                from categorias;
            `)).rows;
        } catch(error){
            throw error;
        }
    }
}

module.exports = { CategoryService };