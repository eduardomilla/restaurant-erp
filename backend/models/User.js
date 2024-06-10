const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['mesero', 'gerente', 'cajero', 'administrador'],
    default: 'mesero'
  }
});

module.exports = mongoose.model('User', UserSchema);
