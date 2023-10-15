require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger');

const express = require('express');
const app = express();

const router = require('./routes');
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
router(app);

app.listen(PORT, ()=>{
  console.log(`Servidor rodando na porta ${PORT} --> http://localhost:${PORT}`);
});