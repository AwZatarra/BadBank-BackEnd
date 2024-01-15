const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios');
const account = require('../models/account');

// Login
router.post('/', async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
        const user = await Usuario.findOne({ correo });

        if (!user) {
            return res.status(401).json({ error: 'Usuario o contraseña inválida' });
        }

        // Verificar si el usuario ha iniciado sesión mediante Google OAuth
        if (user.authProvider === 'google') {
            // No se requiere contraseña para iniciar sesión
            // Realizar las acciones necesarias para iniciar sesión sin contraseña (puedes ajustar según tus necesidades)
        } else {
            // Si no es un usuario de Google, verificar la contraseña
            if (!contraseña) {
                return res.status(401).json({ error: 'Usuario o contraseña inválida' });
            }

            // Validar la contraseña
            if (user.contraseña !== contraseña) {
                return res.status(401).json({ error: 'Usuario o contraseña inválida' });
            }
        }

        // Obtener la cuenta del usuario
        const accountData = await account.findOne({ user: user._id });

        if (!accountData) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        const data = {
            userId: user._id,
            nombre: user.nombre,
            correo: user.correo,
            amount: accountData.balance,
            // Agregar otras propiedades según sea necesario
        };

        res.json(data);

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
