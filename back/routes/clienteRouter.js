const express = require('express');
const clienteController = require('../controllers/clienteController');
const multer = require('multer')
const upload = multer()
const router = express.Router();

// Rota para cadastrar cliente
router.post('/', upload.single('fotoPerfil'), clienteController.cadastrarCliente);

// Rota para editar cliente
router.put('/:codigo', clienteController.editarCliente);

// Rota para retornar lista clientes de completa
router.get('/', clienteController.listarClientes);

// Rota para retornar cliente por código
router.get('/:codigo', clienteController.obterClientePorCodigo);

router.delete('/:codigo', clienteController.deletarClientePorCodigo);

module.exports = router;
