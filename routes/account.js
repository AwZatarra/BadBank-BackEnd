const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const Usuarios = require('../models/usuarios');

// Ruta para obtener el saldo actual y el historial de un usuario
router.get('/alldata/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const account = await Account.findOne({ user: userId });
    if (!account) {
      return res.status(404).json({ error: 'Account not found for the user' });
    }
    res.json({ balance: account.balance, transactions: account.transactions });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta para depositar fondos
router.post('/deposit/:userId', async (req, res) => {
  const userId = req.params.userId;
  const amount = Number(req.body.amount);

  try {
    const user = await Usuarios.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let account = await Account.findOne({ user: userId });
    if (!account) {
      account = new Account({ user: userId });
    }

    account.balance += amount;
    account.transactions.push({ type: 'deposit', amount });
    await account.save();
    res.json({ balance: account.balance, transactions: account.transactions });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta para retirar fondos
router.post('/withdraw/:userId', async (req, res) => {
  const userId = req.params.userId;
  const amount = Number(req.body.amount);

  try {
    const user = await Usuarios.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let account = await Account.findOne({ user: userId });
    if (!account) {
      return res.status(404).json({ error: 'Account not found for the user' });
    }

    if (account.balance >= amount) {
      account.balance -= amount;
      account.transactions.push({ type: 'withdraw', amount });
      await account.save();
      res.json({ balance: account.balance, transactions: account.transactions });
    } else {
      res.status(400).json({ error: 'Insufficient funds' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;