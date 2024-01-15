// En tu ruta de creación de cuenta (createAccountRoute.js)
const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios');
const account = require('../models/account');

// Crear cuenta
router.post('/', async (req, res) => {
    try {
        const { nombre, correo, contraseña, authProvider } = req.body;

        // Verificar si el correo ya está registrado
        const existingUser = await Usuario.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        // Crear nuevo usuario
        const newUser = new Usuario({
            nombre,
            correo,
            contraseña: authProvider === 'google' ? undefined : contraseña,
            authProvider,
        });

        // Guardar usuario en la base de datos
        const savedUser = await newUser.save();

        // Crear cuenta asociada al usuario
        const newAccount = new account({
            user: savedUser._id,
            balance: 100, // o cualquier valor predeterminado
        });

        // Guardar cuenta en la base de datos
        await newAccount.save();

        res.json(savedUser);
    } catch (error) {
        console.error('Error al crear la cuenta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
