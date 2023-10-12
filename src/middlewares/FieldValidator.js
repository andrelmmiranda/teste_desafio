const { object, string, number } = require('yup');
const { StatusCode } = require('../utils');

class FieldValidator{
    
    static async userValidator(req, res, next){
        const schema = object().shape({
            nome: string('Campo nome é obrigatório.').required('Campo nome é obrigatório.'),
            email: string('Campo email é obrigatório.').email().required('Campo email é obrigatório.'),
            senha: string('Campo senha é obrigatório.').required('Campo senha é obrigatório.')
        });

        await FieldValidator.validateSchema(req, res, next, schema);
    }

    static async loginValidator(req, res, next){ 
        const schema = object().shape({
            email: string('Campo email é obrigatório.').email().required('Campo email é obrigatório.'),
            senha: string('Campo senha é obrigatório.').required('Campo senha é obrigatório.')
        });

        await FieldValidator.validateSchema(req, res, next, schema);
    }

    static async validateSchema(req, res, next, schema){
        const { HTTP_401_UNAUTHORIZED } = StatusCode;
        try{
            await schema.validate(req.body, { abortEarly: false });
        } catch(error){
            if(error.message === 'email must be a valid email')
                return res.status(HTTP_401_UNAUTHORIZED).json({ error: 'Formáto de email inválido'});

            return res.status(HTTP_401_UNAUTHORIZED).json({ error: error.message  });
        }
        next();
    }

    static async transactionValidator(req, res, next){
        const schema = object().shape({
            descricao: string().required('Campo descrição é obrigatório.'),
            valor: number().required('Campo valor é obrigatório.').positive().integer(),
            data: string().required('Campo data é obrigatório.'),
            categoria_id: string().required('Campo categoria_id é obrigatório.'),
            tipo: string().oneOf(['entrada', 'saida']).required('Campo tipo é obrigatório')
        });

        FieldValidator.validateSchema(req, res, next, schema);
    }
}

module.exports = { FieldValidator };