const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rota para cadastrar uma nova categoria
router.post('/', categoriaController.cadastrarCategoria);

// Rota para editar uma categoria por código
router.put('/:codigo', categoriaController.editarCategoria);

// Rota para retornar a lista de categorias completa
router.get('/', categoriaController.listarCategorias);

// Rota para retornar uma categoria por código
router.get('/:codigo', categoriaController.getCategoriaByCodigo);

router.delete('/:codigo', categoriaController.deletarCategoriaPorCodigo);

module.exports = router;
