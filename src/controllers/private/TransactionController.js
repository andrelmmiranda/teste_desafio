const { pool } = require('../../connection');
const { TransactionService } = require('../../services');
const { StatusCode, beginCommitDecorator } = require('../../utils');

class TransactionController{

    static async getTransactions(req, res){
        const { HTTP_200_OK, HTTP_400_BAD_REQUEST } = StatusCode;

        try{
            const data = await TransactionService.getTransactions(req.payload, req.query);

            return res.status(HTTP_200_OK).json(data);
        } catch(error){
            return res.status(HTTP_400_BAD_REQUEST).json({ error: error.message });   
        }
    }

    static async getTransactionById(req, res){
        const { HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND } = StatusCode;

        try{
            const data = await beginCommitDecorator(TransactionService.getTransactionById(req.payload, req.params));

            return !!data ?
                res.status(HTTP_200_OK).json(data) :
                res.status(HTTP_404_NOT_FOUND).json({ mensagem: 'Transação não encontrada.' });
        } catch(error){
            await pool.query('rollback');
            return res.status(HTTP_400_BAD_REQUEST).json({ mensagem: error.message });
        }
    }

    static async createTransaction(req, res){
        const { HTTP_200_OK, HTTP_400_BAD_REQUEST } = StatusCode;

        try{
            const data = await TransactionService.createTransaction(req.body, req.payload);

            return data.hasOwnProperty('id') ?
                res.status(HTTP_200_OK).json(data) :
                res.status(HTTP_400_BAD_REQUEST).json({ mensagem: 'Erro ao tentar criar transação.' });
        } catch(error){
            return res.status(HTTP_400_BAD_REQUEST).json({ error: error.message });
        }
    }

    static async updateTransaction(req, res){
        const { HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND } = StatusCode;

        try{
            const data = await beginCommitDecorator(TransactionService.updateTransaction(req.payload, req.body, req.params));
    
            return !!data ? 
                res.status(HTTP_200_OK).json() : 
                res.status(HTTP_404_NOT_FOUND).json({ mensagem: 'Transação não encontrada' });
        } catch(error){
            await pool.query('rollback');
            return res.status(HTTP_400_BAD_REQUEST).json({ error: error.message });
        }
    }

    static async deleteTransaction(req, res){
        const { HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND } = StatusCode;

        try{
            const data = await TransactionService.deleteTransaction(req.payload, req.params);

            return !!data ? 
                res.status(HTTP_200_OK).json() :
                res.status(HTTP_404_NOT_FOUND).json({ mensagem: 'Transação não encontrada.' });
        } catch(error){
            return res.status(HTTP_400_BAD_REQUEST).json({ error: error.message })
        }
    }

    static async getExtract(req, res){
        const { HTTP_200_OK, HTTP_400_BAD_REQUEST } = StatusCode;

        try{
            const data = await TransactionService.getExtract(req.payload);

            return res.status(HTTP_200_OK).json(data);
        } catch(error){
            return res.status(HTTP_400_BAD_REQUEST).json({ error: error.message });
        }
    }
}

module.exports = { TransactionController };