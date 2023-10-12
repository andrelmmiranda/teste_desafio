const { PublicService } = require('../../services');
const { pool } = require('../../connection');
const { StatusCode, beginCommitDecorator } = require('../../utils');

class PublicController{
    static async createUser(req, res){
        const { HTTP_201_CREATED, HTTP_400_BAD_REQUEST } = StatusCode;

        try{
            const data = await beginCommitDecorator(PublicService.createUser(req.body));

            return res.status(HTTP_201_CREATED).json(data);
        } catch(error){
            await pool.query('rollback');
            return res.status(HTTP_400_BAD_REQUEST).json({ error: error.message });
        }
    }

    static async login(req, res){
        const { HTTP_200_OK, HTTP_400_BAD_REQUEST } = StatusCode;
    
        try{
            const data = await beginCommitDecorator(PublicService.login(req.body));

            return data.hasOwnProperty('usuario') ?
                res.status(HTTP_200_OK).json(data) : 
                res.status(HTTP_400_BAD_REQUEST).json({ mensagem: 'Usuário ou senha inválido(s).'});
        } catch(error){
            await pool.query('rollback');
            return res.status(HTTP_400_BAD_REQUEST).json({ error: error.message });
        }
    }
}

module.exports = { PublicController };