const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        // Conexión a MongoDB
        mongoose.connect('mongodb+srv://cristopher:cristopher@cristopher.uefp7ho.mongodb.net/BadBank')
        .then(() => {
            console.log('Conexión a MongoDB establecida');
        })
        .catch((err) => {
            console.error('Error al conectar a MongoDB:', err.message);
        });
    }
    connect();
}
