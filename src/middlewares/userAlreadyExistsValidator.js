const { pool } = require('../connection');
const { StatusCode } = require('../utils');

const userAlreadyExistsValidator = async (req, res, next)=>{
    const { email } = req.body;
    const { HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND } = StatusCode;
    
    const url = req.originalUrl;

    try{
        const data = (await pool.query('select * from usuarios where email=$1', [email])).rowCount;

        if(!!data)
            switch(url){
                case '/usuario':
                    return res.status(HTTP_200_OK).json({ mensagem: 'Já existe usuário cadastrado com e-mail informado.' });
                case '/login':
                    return next();
            }
        else
            switch(url){
                case '/usuario':
                    return next();
                case '/login':
                    return res.status(HTTP_404_NOT_FOUND).json({ mensagem: 'Usuário não encontrado.' });
            }
    } catch(error){
        return res.status(HTTP_400_BAD_REQUEST).json({ error: error.message });
    }
}

module.exports = { userAlreadyExistsValidator };