const { TokenJwt, StatusCode } = require('../utils');

const tokenValidator = async (req, res, next) =>{
    const [ tokenType, tokenValue ] = req.headers.authorization?.split(' ') || ['', ''];

    const { HTTP_401_UNAUTHORIZED } = StatusCode;

    if(!tokenValue)
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.'});

    try{
        const payload = TokenJwt.verifyToken(tokenValue);
        
        const userIdFromToken = typeof payload !== 'string' && payload.id;

        if(!userIdFromToken)
            return res.status(HTTP_401_UNAUTHORIZED).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });

        req.payload = payload;
    } catch(error){
        if(error.message === 'jwt expired')
            return res.status(HTTP_401_UNAUTHORIZED).json({ mensagem: 'Token expirado.', expirado_em: error.expiredAt });
        
        if(error.message === 'jwt must be provided')
            return res.status(HTTP_401_UNAUTHORIZED).json({ mensagem: 'Token não fornecido ou inválido.' });

        if(error.message === 'invalid signature')
            return res.status(HTTP_401_UNAUTHORIZED).json({ mensagem: 'Assinatura inválida.' });

        return res.status(HTTP_401_UNAUTHORIZED).json({ mensagem: error.message });
    }
    next();
}

module.exports = { tokenValidator };