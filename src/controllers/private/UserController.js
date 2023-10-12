const { pool } = require('../../connection');
const { UserService } = require('../../services');
const { StatusCode, beginCommitDecorator } = require('../../utils');

class UserController{

    static async getUser(req, res){
        const { HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST } = StatusCode;

        try{
            const data = await UserService.getUser(req.payload);

            return !!data ? 
                res.status(HTTP_200_OK).json(data) :
                res.status(HTTP_404_NOT_FOUND).json({ mensagem: 'Usuário não encontrado.'});
        } catch(error){
            return res.status(HTTP_400_BAD_REQUEST).json({ error: error.message });
        }
    }

    static async updateUser(req, res){
        const { HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND } = StatusCode;
    
        try{
            const data = await beginCommitDecorator(UserService.updateUser(req.body, req.payload));
    
            return !!data ? 
                res.status(HTTP_200_OK).json() : 
                res.status(HTTP_404_NOT_FOUND).json({ mensagem: 'Usuário não encontrado'});
        } catch(error){
            await pool.query('rollback');
            if(error.message === "duplicate key value violates unique constraint \"usuarios_email_key\"")
                return res.status(HTTP_401_UNAUTHORIZED).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.'});
            
            return res.status(HTTP_400_BAD_REQUEST).json({ error: error.message });
        }
    }
}

module.exports = { UserController };