const { Router } = require('express');
const { tokenValidator, FieldValidator } = require('../../middlewares');
const { TransactionController } = require('../../controllers');

const transactionRoutes = Router();

transactionRoutes.get('/transacao/extrato', tokenValidator, TransactionController.getExtract);

transactionRoutes.get('/transacao', tokenValidator, TransactionController.getTransactions);

transactionRoutes.get('/transacao/:id', tokenValidator, TransactionController.getTransactionById);

transactionRoutes.post('/transacao', FieldValidator.transactionValidator, tokenValidator, TransactionController.createTransaction);

transactionRoutes.put('/transacao/:id', FieldValidator.transactionValidator, tokenValidator, TransactionController.updateTransaction);

transactionRoutes.delete('/transacao/:id', tokenValidator, TransactionController.deleteTransaction);

module.exports = { transactionRoutes };