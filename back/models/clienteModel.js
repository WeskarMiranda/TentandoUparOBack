const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const clienteSchema = new mongoose.Schema({
    codigo: Number,
    nome: {
        type: String,
        required: true
      },
    cartaoNome: String,
    cartaoNumero: Number,
    cartaoCvc: Number,
    telefone: Number,
    endereco: String,
    cpf: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
      },
      password: {
        type: String,
        required: true,
        select: false
      },
    fotoPerfil: {type: Buffer},
    token: {
        type: String,
        select: false
    }
    
});

clienteSchema.pre('save', async function (next) {
    const hash = await bcryptjs.hash(this.password, 8);
    this.password = hash;
    next();
  });

module.exports = mongoose.model('clientes', clienteSchema);