const express = require('express');
const db = require('./config/config');
const app = express();
const PORT = 5000;

const cors=require('cors');

const usuariosRouter = require('./routes/usuarios');
const loginRouter = require('./routes/login');
const accountRouter = require('./routes/account');

app.use(cors())
app.use(express.json());
app.use('/createaccount', usuariosRouter);
app.use('/login', loginRouter);
app.use('/account', accountRouter);

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

db();