const { pool } = require('../../connection');
const { ExtractDto } = require('../../dtos');

class TransactionService{

    static async getTransactions({ id: userId }, { filtro }){

        if(!!filtro){
            try{
                const parameters = (filtro.map((_, i)=> `$${ i + 1 }`)).join(', ');

                return (await pool.query(`
                    select transacao.id, transacao.tipo, transacao.descricao, transacao.valor, transacao.data, transacao.usuario_id, transacao.categoria_id, categoria.descricao as categoria_nome 
                    from transacoes transacao
                    join categorias categoria
                    on transacao.categoria_id=categoria.id
                    join usuarios usuario
                    on transacao.usuario_id=usuario.id
                    where categoria.descricao in(${ parameters }) and usuario.id=$${ filtro.length + 1 };
                `, [ ...filtro, userId ])).rows;
            } catch(error){
                throw error;
            }
        }

        try{
            return (await pool.query(`
                select * 
                from transacoes 
                where usuario_id=$1;
            `, [ userId ])).rows;
        } catch(error){
            throw error;
        }
    }

    static async getTransactionById({ id: userId }, { id: transactionId }){
        try{
            return (await pool.query(`
                select transacao.id, transacao.tipo, transacao.descricao, transacao.valor, transacao.data, transacao.usuario_id, transacao.categoria_id, categoria.descricao as categoria_nome 
                from transacoes transacao
                join categorias categoria
                on transacao.categoria_id=categoria.id
                join usuarios usuario
                on transacao.usuario_id=usuario.id
                where transacao.id=$1 and usuario.id=$2;
            `, [ transactionId, userId ])).rows.at(0);
        } catch(error){ 
            throw error;
        }
    }

    static async createTransaction({ descricao, valor, data: date, tipo, categoria_id }, { id: userId }){
        try{
            return (await pool.query(`
                insert into transacoes (descricao, valor, data, tipo, categoria_id, usuario_id) 
                values($1, $2, $3, $4, $5, $6) 
                returning *;
            `, [ descricao, valor, date, tipo, categoria_id, userId ])).rows.at(0);
        } catch(error){
            throw error;
        }
    }

    static async updateTransaction({ id: userId }, { descricao, valor, data: date, tipo, categoria_id }, { id: transactionId }){
        try{
            const transaction = (await pool.query(`
                select * 
                from transacoes 
                where usuario_id=$1
            `, [ userId ])).rowCount;

            return !! transaction ?
                (await pool.query(`
                    update transacoes 
                    set descricao=$1, valor=$2, data=$3, tipo=$4, categoria_id=$5 
                    where id=$6 and usuario_id=$7;
                `, [ descricao, valor, date, tipo, categoria_id, transactionId, userId ])).rowCount : 
                false;
        } catch(error){
            throw error;
        }
    }

    static async deleteTransaction({ id: userId }, { id: transactionId }){
        try{
            const transaction = (await pool.query(`
                select * 
                from transacoes 
                where usuario_id=$1;
            `, [ userId ])).rowCount;

            return !!transaction ?
                (await pool.query(`
                    delete 
                    from transacoes 
                    where id=$1 and usuario_id=$2;
                `, [ transactionId, userId ])).rowCount :
                false;
        } catch(error){
            throw error;
        }
    }

    static async getExtract({ id: userId }){
        try {
            const { sum: input } = await this.sumExtract('entrada', userId);
            const { sum: output } = await this.sumExtract('saida', userId);
            
            return new ExtractDto(input, output);
        } catch(error){
            throw error;
        }
    }

    static async sumExtract(tipo, userId){
        return (await pool.query(`
            select sum(valor) 
            from transacoes 
            where tipo=$1 and usuario_id=$2;
        `, [ tipo, userId ])).rows.at(0);
    }
}

module.exports = { TransactionService };