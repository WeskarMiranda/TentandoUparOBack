const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer()
const produtoController = require('../controllers/produtoController');

// Rota para cadastrar um produto
router.post('/', upload.single('imagem'), produtoController.cadastrarProduto);

// Rota para editar um produto por código
router.put('/:codigo', produtoController.editarProduto);

// Rota para retornar a lista de produtos completa
router.get('/', produtoController.listarProdutos);

// Rota para retornar um produto por código
router.get('/:codigo', produtoController.getProdutoByCodigo);

router.delete('/:codigo', produtoController.deletarProdutoPorCodigo);

module.exports = router;
