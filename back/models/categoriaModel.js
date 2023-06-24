const mongoose = require('mongoose');

const categoriaShema = new mongoose.Schema({
    codigo: Number,
    nome: String,
    descrição: String,
});

module.exports = mongoose.model('categorias', categoriaShema);