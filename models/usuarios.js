const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: false,
  },
  authProvider: {
    type: String,
    default: 'local', // Valor predeterminado para usuarios registrados localmente
  },
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);
