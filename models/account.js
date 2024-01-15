const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdraw'],
    default: 'deposit',
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

const accountSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true,
    },
    balance: {
      type: Number,
      default: 100,
    },
    transactions: [transactionSchema],
  });

module.exports = mongoose.model('Account', accountSchema);