require('dotenv').config();

const express = require('express');
const app = express();

const router = require('./routes');
const PORT = process.env.PORT;

app.use(express.json());
router(app);

app.listen(PORT, ()=>{
  console.log(`Servidor rodando na porta ${PORT} --> http://localhost:${PORT}`);
});